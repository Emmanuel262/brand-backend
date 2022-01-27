import express from "express";
import { login_post, logout_get } from "../controllers/userControllers.js";
const router = express.Router();

// router.post("/register", userController.signup_post);
router.post("/login", login_post);
router.get("/logout", logout_get);

export default router;
