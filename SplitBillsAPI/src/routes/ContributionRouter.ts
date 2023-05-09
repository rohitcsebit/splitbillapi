import { Router } from "express";
import {
  //   createContribution,
  getContributionsByUserId,
  getContributionsByActivityId,
  payContribution,
  payAllContributionsForUser,
} from "../controllers/ContributionController";

const router = Router();

// router.post("/", createContribution);
router.get("/user/:userId", getContributionsByUserId);
router.get("/activity/:activityId", getContributionsByActivityId);
router.post("/payment/:contributionId/pay", payContribution);
router.post("/user/:userId/pay-all-contributions", payAllContributionsForUser);

export default router;
