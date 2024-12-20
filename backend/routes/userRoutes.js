import express from "express";
import {
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
	getAllUsers,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", protectRoute, getUserProfile);
router.get("/all", protectRoute, getAllUsers)
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
