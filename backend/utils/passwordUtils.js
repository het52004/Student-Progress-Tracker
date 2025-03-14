import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashPassword = async (password, res) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    console.log("Error in hashing password");
    return res.json({ success: false, message: "Error in hashing password!" });
  }
};

export const verifyPassword = async (password, hashedPassword, res) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("Error in verifying password");
    return res.json({ success: false, message: "Error in verifying password!" });
  }
};
