import { Router } from "express";
import {profileInfo, updateProfile} from "../controllers/Profile.controller.js";

const router = Router();

// Get profile info
router.get("/:id/", profileInfo);

// Update profile
router.post("/:id/update", updateProfile);


export default router;

