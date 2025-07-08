import { asyncHandler } from "../utils/async-handler.js";
import crypto from "crypto";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { emailVerificationMailGenContent, sendMail } from "../utils/mail.js";

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, fullname, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(404, "User already exists");
  }

  const newUser = await User.create({
    email,
    username,
    password,
    fullname,
  });

  if (!newUser) {
    throw new ApiError(400, "User not registered!");
  }

  //genrating token
  const { hashedToken, unHashedToken, tokenExpiry } =
    await newUser.genrateTemporaryToken();

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationExpiry = tokenExpiry;

  await newUser.save();

  const verificationURL = `${process.env.BASE_URL}/api/v1/verify/${unHashedToken}`;

  try {
    await sendMail({
      email: newUser.email,
      subject: "Verification Email",
      mailGenContent: emailVerificationMailGenContent(
        username,
        verificationURL,
      ),
    });
  } catch (error) {
    console.log("caught error in mail");

    console.error("❌ Failed to send verification email:", error);

    // Optional: delete the user if you don't want unverified users lingering
    await User.findByIdAndDelete(newUser._id);

    throw new ApiError(
      500,
      "User created but failed to send verification email",
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      "User created successfully",
    ),
  );
});

//verify email
const verify = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //validation
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() }, // check it's not expired
  });

  if (!user) {
    throw new ApiError(404, "Invalid or expired verification token");
  }

  user.emailVerificationToken = "";
  user.emailVerificationExpiry = "";
  user.isEmailVerified = true;

  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        username: user.username,
      },
      "User verified successfully",
    ),
  );
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(400, "User didn't exist!");
  }

  const isPassCorrect = await user.isPasswordCorrect(password);

  if (!isPassCorrect) {
    throw new ApiError(400, "Invalid inputs!");
  }

  const accessToken = user.genrateAccessToken();
  const refreshToken = user.genrateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save();

  //now store it in the cookie
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        username: user.username,
        accessToken: accessToken,
      },
      "User logged in successfully",
    ),
  );
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    const user = await User.findOne({ refreshToken });

    if (user) {
      user.refreshToken = "";
      await user.save();
    }
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true, // make sure HTTPS is enabled in production
    sameSite: "none",
  };

  // Properly clear cookies by setting expired dates
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, "user logged out successfully! "));
});

//TODO:
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "Can't get the user!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, `Welcome ${user.name}`));
});

//TODO:
const resendVerifcationEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

export {
  registerUser,
  verify,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPasswordRequest,
  resendVerifcationEmail,
  refreshAccessToken,
  changeCurrentPassword,
};
