import express from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
} from "../controllers/adminAuthentication.controller.js";

const router = express.Router();

router.route("/adminSignup").post(adminSignup);
router.route("/adminLogin").post(adminLogin);
router.route("/adminLogout").get(adminLogout);

export default router;
