import express from "express";
import {
  createActivity,
  getActivities,
  getActivityById,
  deleteActivity,
} from "../controllers/ActivityController";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.get("/:id", getActivityById);
router.delete("/:id", deleteActivity);

export default router;
