import express from "express";
import {
  forgetPassword,
  login,
  logout,
  profile,
  registerUser,
  resetPassword,
  verify,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verify);
router.post("/login", login);
router.get("/profile", isLoggedIn, profile);
router.get("/logout", isLoggedIn, logout);
router.post("/forgetpass", isLoggedIn, forgetPassword);
router.post("/resetpass/:token", isLoggedIn, resetPassword);

export default router;
