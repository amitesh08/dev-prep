import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }
  try {
    //checking if user exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already exists.",
      });
    }

    //if user did not exist
    const user = await User.create({
      name,
      email,
      password,
    });

    //if user did not registered
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    //if user is created create a verification token and store in DB
    //to generate token --> crypto
    const token = crypto.randomBytes(32).toString("hex");

    //storing it in DB
    user.verificationToken = token;

    await user.save();

    //send token as email
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PASSWORD,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify/${token}`;

    const mailOptions = {
      from: process.env.MAILTRAP_SENDERMAIL,
      to: user.email,
      subject: "Verifiy your account ✔",
      text: `Hello! Please verify your email by visiting the following link: ${verificationLink}`, // fallback plain-text
      html: `
        <p>Hello!</p>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verificationLink}" target="_blank" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        ">Verify Email</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${verificationLink}" target="_blank">${verificationLink}</a></p>
    `,
    };

    await transporter.sendMail(mailOptions);

    //send success
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "User not registered",
      err,
    });
  }
};

// VERIFY USER
const verifyUser = async (req, res) => {
  try {
    const { token } = req.params; //getting token from the URL
    console.log(token);

    if (!token) {
      return res.status(400).json({
        message: "Invalid token!",
      });
    }

    // Find the user with the matching verification token
    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    user.isVerified = true;

    user.verificationToken = undefined; //we can do null also both are fine

    await user.save();

    return res.status(200).json({
      message: "User verified successfully!",
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

//Login route
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all the Fields.",
    });
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    //checking the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    //TODO: check if user is verified and then proceed to next step.

    //now assign a token to user everytime they login and check the token with every user.
    //Jason web token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    //now store it in the cookie
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);

    //if everthing is right return the user
    res.status(201).json({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "User failed to login",
    });
  }
};

//TODO: profile route
const profile = async (req, res) => {
  try {
    const data = req.user;

    //this return everything except password.
    const user = await User.findById(data.id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not found!",
      });
    }

    //if user found return true with the user detail.
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("failed to get profile " + error);
    return res.status(400).json({
      success: false,
      message: "Error loading profile!",
    });
  }
};

//TODO: logout
const logout = async (req, res) => {
  try {
    res.cookie("token", " ", {}); //--> {expires: new Date(0)} --> by writting this the token will be removed imidiately

    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    console.log("fail to log out " + error);
    return res.status(400).json({
      success: false,
      message: "Error logging out!",
    });
  }
};

//TODO: Forget password
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const token = jwt.sign(
      {
        email: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    user.ResetpasswordToken = token;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; //means it's valid for only 10mins.

    await user.save();

    //send token as email
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PASSWORD,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/api/v1/users/resetpass/${token}`;

    const mailOptions = {
      from: process.env.MAILTRAP_SENDERMAIL,
      to: user.email,
      subject: "Reset your Password ✔",
      text: `Hello! Please reset your password by visiting the following link: ${verificationLink}`, // fallback plain-text
      html: `
        <p>Hello!</p>
        <p>Please click the button below to reset your Password:</p>
        <a href="${verificationLink}" target="_blank" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        ">Verify Email</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${verificationLink}" target="_blank">${verificationLink}</a></p>
    `,
    };

    await transporter.sendMail(mailOptions);

    //send success
    res.status(201).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.log("error forgetting password" + error);
    return res.status(400).json({
      success: false,
      message: "failed to forget password ",
    });
  }
};

//TODO: reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      ResetpasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, //gt--> means greater than current time
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not found",
      });
    }
    user.password = password;

    user.ResetpasswordToken = "";
    user.resetPasswordExpires = "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("error reseting password" + error);
    return res.status(400).json({
      success: false,
      message: "failed to reset password ",
    });
  }
};

export {
  registerUser,
  verifyUser,
  login,
  profile,
  logout,
  forgetPassword,
  resetPassword,
};
