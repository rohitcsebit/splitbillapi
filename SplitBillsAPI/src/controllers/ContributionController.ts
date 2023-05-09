import { Request, Response } from "express";
import Contribution, {
  Contribution as ContributionType,
} from "../models/ContributionModel";
import Activity, { Activity as ActivityType } from "../models/ActivityModel";

export const getContributionsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const contributions = await Contribution.find({ userId });
    // .populate({
    //   path: "activityId",
    //   populate: {
    //     path: "userIds",
    //     model: "User",
    //     select: "name",
    //   },
    // }).exec();

    res.status(200).json(contributions);

    // res.status(200).json(contributions);
  } catch (error) {
    // //console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getContributionsByActivityId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activityId = req.params.activityId;
    const contributions: ContributionType[] = await Contribution.find({
      activityId,
    });
    res.status(200).json(contributions);
  } catch (error) {
    //console.error(error);
    res.status(500).send("Server Error");
  }
};

// Mark a contribution as paid
export const payContribution = async (req: Request, res: Response) => {
  try {
    const contributionId = req.params.contributionId;
    const contribution: ContributionType | null = await Contribution.findById(
      contributionId
    );
    // console.log("contributionId", contributionId);
    if (!contribution) {
      return res.status(404).json({ error: "Contribution not found" });
    }
    contribution.paid = true;
    await contribution.save();
    res.status(200).json(contribution);
  } catch (error) {
    // //console.error(error);
    res.status(500).send("Server Error");
  }
};

// Mark all contributions for a user as paid for a specific activity
export const payAllContributionsForUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const contributions: ContributionType[] = await Contribution.find({
      userId,
    });

    if (contributions.length === 0) {
      return res.status(404).json({ error: "No contributions found for user" });
    }

    // console.log("contributions", contributions);
    const updatedContributions = contributions.map((contribution) => {
      if (!contribution.paid) {
        contribution.paid = true;
        return contribution.save();
      }
      return contribution;
    });

    await Promise.all(updatedContributions);

    res
      .status(200)
      .json({ message: "All contributions for user marked as paid" });
  } catch (error) {
    //console.error(error);
    res.status(500).send("Server Error");
  }
};
