import express from "express";
import {
  login,
  profile,
  registerUser,
  verify,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verify);
router.post("/login", login);
router.get("/profile", isLoggedIn, profile);

export default router;
