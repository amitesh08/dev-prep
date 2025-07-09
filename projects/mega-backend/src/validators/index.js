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

export { userRegistrationValidator, userLoginValidator, emailOnlyValidator };
