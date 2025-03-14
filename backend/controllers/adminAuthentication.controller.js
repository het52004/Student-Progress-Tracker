import Admin from "../models/admin.model.js";
import {
  adminLoginValidation,
  adminSignupValidation,
} from "../validations/adminValidation.js";
import { hashPassword, verifyPassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/jwtUtils.js";

export const adminSignup = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({
      success: false,
      message: "Admin details cannot be empty!",
    });
  } else {
    try {
      const validatedAdminData = adminSignupValidation.parse(data);
      const { adminName, adminPassword, adminEmail } = validatedAdminData;
      const existingAdmin = await Admin.findOne({ adminEmail });
      if (existingAdmin) {
        return res.json({ success: false, message: "Admin already exists!" });
      } else {
        const hashedPassword = await hashPassword(adminPassword, res);
        const newAdmin = await Admin.create({
          adminName,
          adminPassword: hashedPassword,
          adminEmail,
        });
        if (!newAdmin) {
          return res.json({
            succsess: false,
            message: "Error during creating new admin!",
          });
        } else {
          const payload = { id: admin._id, email: admin.adminEmail };
          generateToken(payload, res);
          return res.json({
            succsess: true,
            message: "admin has been registered successfully!",
          });
        }
      }
    } catch (error) {
      console.log("Error in adminSignup controller: ", error.message);
      return res.json({ succsess: false, message: "Error during signup!" });
    }
  }
};

export const adminLogin = async (req, res) => {
  try {
    const data = req.body;
    const validatedAdminData = adminLoginValidation.parse(data);
    const { adminEmail, adminPassword } = validatedAdminData;
    const admin = await Admin.findOne({ adminEmail });
    if (!admin) {
      return res.json({
        success: false,
        message: "Admin with this email does not exist!",
      });
    } else {
      if (!(await verifyPassword(adminPassword, admin.adminPassword, res))) {
        return res.json({
          success: false,
          message: "Password you entered is wrong!",
        });
      } else {
        const payload = { id: admin._id, email: admin.adminEmail };
        generateToken(payload, res);
        return res.json({
          success: true,
          message: "You have been successfully logged in!",
        });
      }
    }
  } catch (error) {
    console.log("Error in admin login controller: ", error.message);
    return res.json({ succsess: false, message: "Error during login!" });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.json({ succsess: true, message: "You have been logged out successfully!" });
  } catch (error) {
    console.log("Error in admin logout controller: ", error.message);
    return res.json({ succsess: false, message: "Error during logout!" });
  }
}