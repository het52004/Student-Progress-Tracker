import express from "express";
import { educatorSignup } from "../controllers/authentication.controllers.js";

const router = express.Router();

router.route("/educatorSignup").post(educatorSignup);

export default router;