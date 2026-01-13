import express from "express";
import { hireFreelancer } from "../controllers/hireController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.patch("/:bidId/hire", protect, hireFreelancer);

export default router;
