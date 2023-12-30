import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized - Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized - No Token");
  }
});

export default protect;
