import jwt from "jsonwebtoken";
import { path } from "pdfkit";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: process.env.NODE_ENV === "production", // prevent XSS attacks cross-site scripting attacks
    sameSite: "none", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV === "production",
    path:"/",
  });

  return token;
};
