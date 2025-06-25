import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    console.log(token ? "token found" : "token not found");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Authentication failed!",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("failure in authenticating the user");
    return res.status(400).json({
      success: false,
      message: "Internal Server error!",
    });
  }
};
