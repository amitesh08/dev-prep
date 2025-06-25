import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

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
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

//verify the email
const verify = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Can't get the Token!",
      });
    }

    //if you multiple checks use findFirst
    //findunique only works on primary or unique elements.
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        isVerified: false,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token doesn't match or user already verified!",
      });
    }

    //to update in the schema we use update
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    res.status(200).json({
      success: true,
      message: "User is verified!",
      userName: user.name,
    });
  } catch (error) {
    console.log("error verifying user! " + error);
    return res.status(400).json({
      success: false,
      message: "verification failed! ",
    });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "provide all the fields!",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is not verified! verify first.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "wrong credentials!",
      });
    }

    //token generate
    const token = await jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    //store it in cookie
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User logged In successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("login failed" + error);
    return res.status(400).json({
      success: false,
      message: "login failed due to server error!",
    });
  }
};

//profile
const profile = async (req, res) => {
  const data = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        // password: false not needed; just omit it
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(201).json({
      success: true,
      message: "profile",
      user,
    });
  } catch (error) {
    console.log("error fetching profile! " + error);
    return res.status(400).json({
      success: false,
      message: "Error getting profile!",
    });
  }
};

export { registerUser, verify, login, profile };
