import express from "express";
import {
  forgetPassword,
  login,
  logout,
  profile,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/profile", isLoggedIn, profile);
router.get("/logout", isLoggedIn, logout);
router.post("/forgetpass", isLoggedIn, forgetPassword);
router.post("/resetpass/:token", isLoggedIn, resetPassword);

export default router;
