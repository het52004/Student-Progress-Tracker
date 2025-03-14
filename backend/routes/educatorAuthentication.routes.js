import express from "express";

const router = express.Router();

router.route("/educatorSignup").post();
router.route("/educatorLogin").post();
router.route("/educatorLogout").post();

export default router;