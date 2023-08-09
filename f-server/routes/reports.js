import express from "express";
import { getDemo } from "../controllers/reports.js";

const router = express.Router();

router.get("/demo", getDemo);

export default router;