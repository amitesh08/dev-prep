import { asyncHandler } from "../utils/async-handler.js";
import { userRegistrationValidator } from "../validators/index.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  userRegistrationValidator(req.body);
});

//TODO:
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const logOutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const resendVerifcationEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

//TODO:
const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

export { registerUser };
