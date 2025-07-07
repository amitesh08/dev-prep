import { asyncHandler } from "../utils/async-handler.js";
import { userRegistrationValidator } from "../validators/index.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { emailVerificationMailGenContent, sendMail } from "../utils/mail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, fullname, password } = req.body;

  //validation
  // const isValid = userRegistrationValidator(req.body);

  // if (!isValid) {
  //   throw new ApiError(404, "Error registring user!");
  // }

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

  const verificationURL = `${process.env.BASE_URL}/api/v1/users/verify/${unHashedToken}`;

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

    // Or: just throw to let global error handler take over
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

//TODO:
const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

export { registerUser };
