import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verify,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userLoginValidator,
  userRegistrationValidator,
} from "../validators/index.js";

const router = Router();

// router.post("/register", userRegistrationValidator(), validate, registerUser);
//can also write it like below
router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

router.route("/verify/:token").get(verify);

router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/logout").get(logoutUser);

export default router;
