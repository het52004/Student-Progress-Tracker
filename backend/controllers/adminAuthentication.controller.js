import Admin from "../models/admin.model.js";
import { adminSignupValidation } from "../validations/adminValidation.js";
import { hashPassword } from "../utils/passwordUtils.js";
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
        const hashedPassword = await hashPassword(adminPassword);
        if (!hashedPassword) {
          return res.json({
            succsess: false,
            message: "Error during creating new admin!",
          });
        } else {
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
            generateToken(newAdmin._id, res);
            return res.json({
              succsess: true,
              message: "admin has been registered successfully!",
            });
          }
        }
      }
    } catch (error) {
      console.log("Error in adminSignup controller: ", error.message);
      return res.json({ succsess: false, message: "Error during signup!" });
    }
  }
};
