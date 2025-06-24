import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPass,
        verificationToken: token,
      },
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "error creating user!",
      });
    }

    //send token as email
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: parseInt(process.env.MAILTRAP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify/${token}`;

    const mailOptions = {
      from: process.env.MAILTRAP_SENDERMAIL,
      to: newUser.email,
      subject: "Verify your account ✔",
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

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      userId: newUser.id,
    });
  } catch (err) {
    console.log("error creating user" + err);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

export { registerUser };
