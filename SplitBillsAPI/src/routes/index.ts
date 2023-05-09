import express from "express";
import userRouter from "./UserRouter";
import activityRouter from "./ActivityRouter";
import contributionRouter from "./ContributionRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/activities", activityRouter);
router.use("/contribution", contributionRouter);

export default router;
