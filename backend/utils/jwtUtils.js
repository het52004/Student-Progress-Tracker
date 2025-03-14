import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload, res) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log("Token error", error.message);
    return res.json({ success: false, message: "Error in generating token!" });
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("Error in Jwt Utils", error.message);
    return null;
  }
};
