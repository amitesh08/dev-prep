import { body } from "express-validator";

const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username should atleast 3 char")
      .isLength({ max: 13 })
      .withMessage("Username shouldn't exceed 13 char"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 7 })
      .withMessage("password should atleast 7 char")
      .isLength({ max: 13 })
      .withMessage("password shouldn't exceed 13 char"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("password is required"),
  ];
};

const emailOnlyValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const passwordOnlyValidator = () => {
  return [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 7, max: 13 })
      .withMessage("Password must be between 7 and 13 characters"),
  ];
};

const passwordChangeValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Old password is required")
      .isLength({ min: 7, max: 13 })
      .withMessage("Old password must be between 7 and 13 characters"),

    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 7, max: 13 })
      .withMessage("New password must be between 7 and 13 characters"),
  ];
};

export {
  userRegistrationValidator,
  userLoginValidator,
  emailOnlyValidator,
  passwordOnlyValidator,
  passwordChangeValidator,
};
