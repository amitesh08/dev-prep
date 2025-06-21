import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  //get the token
  //check if the token is correct or not
  //extract data from token
  try {
    let token = req.cookies?.token; //req.cookies.token || " "

    console.log(token ? "token found" : "token not found");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Authentication failed!",
      });
    }

    //verifying with the token stored in the DB
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; //storing data in req.user

    next();
  } catch (error) {
    console.log("failure in authenticating the user");
    return res.status(400).json({
      success: false,
      message: "Internal Server error!",
    });
  }
};
