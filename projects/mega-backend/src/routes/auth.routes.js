import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendVerificationEmail,
  resetPassword,
  verify,
} from "../controllers/auth.controllers.js";
import {
  emailOnlyValidator,
  passwordChangeValidator,
  passwordOnlyValidator,
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

router.route("/logout").get(verifyJWT, logoutUser);

router.route("/me").get(verifyJWT, getCurrentUser);

router.route("/refresh-token").post(refreshAccessToken);

router
  .route("/resend-verification")
  .post(emailOnlyValidator(), validate, resendVerificationEmail);

router
  .route("/forgot-password")
  .post(emailOnlyValidator(), validate, forgotPasswordRequest);

router
  .route("/reset-password/:token")
  .post(passwordOnlyValidator(), validate, resetPassword);

router.route("/change-password").post(
  verifyJWT,
  passwordChangeValidator(), // validates oldPassword & newPassword
  validate,
  changeCurrentPassword,
);

export default router;
