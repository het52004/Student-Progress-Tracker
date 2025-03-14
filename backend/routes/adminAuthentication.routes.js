import express from "express";
import { adminSignup } from "../controllers/adminAuthentication.controller.js";

const router = express.Router();

router.route("/adminSignup").post(adminSignup);

export default router;
