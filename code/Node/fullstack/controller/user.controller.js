import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    console.log(process.env.MAILTRAP_HOST);

    const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify/${token}`;

    //FIXME: NOT ABLE TO SEND EMAILS
    const mailOptions = {
      from: process.env.MAILTRAP_SENDEREMAIL,
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

// TODO: VERIFY USER

export { registerUser };
