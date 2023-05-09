import { Request, Response } from "express";
import User from "../models/UserModel";
import Activity, { Activity as ActivityType } from "../models/ActivityModel";
import Contribution, {
  Contribution as ContributionType,
} from "../models/ContributionModel";

interface Contribution {
  userId: string;
  amount: number;
}
interface ContributionInput {
  userId: string;
  amount: number;
}

export const getActivities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activities: ActivityType[] = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    //console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getActivityById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activity: ActivityType | null = await Activity.findById(
      req.params.id
    );
    if (!activity) {
      res.status(404).send("Activity not found");
    } else {
      res.status(200).json(activity);
    }
  } catch (error) {
    //console.error(error);
    res.status(500).send("Server Error");
  }
};

export const deleteActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activity: ActivityType | null = await Activity.findByIdAndDelete(
      req.params.id
    );
    if (!activity) {
      res.status(404).send("Activity not found");
    } else {
      res.status(200).json(activity);
    }
  } catch (error) {
    //console.error(error);
    res.status(500).send("Server Error");
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { name, totalBillAmount, contributions } = req.body;
    // console.log("contributions", contributions);

    // Check that all user IDs in the contributions array are valid
    const userIds = contributions.map(
      (contribution: ContributionInput) => contribution.userId
    );
    // console.log("userIds", userIds);

    const existingUsers = await User.find({ _id: { $in: userIds } });
    if (existingUsers.length !== userIds.length) {
      return res
        .status(400)
        .json({ error: "Invalid user ID in contributions" });
    }
    // console.log("existingUsers", existingUsers);

    // Check that the sum of the contribution amounts equals the total bill amount
    let totalContributions = 0;
    for (let i = 0; i < contributions.length; i++) {
      totalContributions += contributions[i].amount;
    }

    // console.log("totalContributions", totalContributions);

    if (totalContributions !== totalBillAmount) {
      return res
        .status(400)
        .json({ error: "Total contributions do not match total bill amount" });
    }

    const activity: ActivityType = new Activity({
      name,
      totalBillAmount,
      userIds: userIds,
    });

    const savedActivity = await activity.save();
    // console.log("activity saved", savedActivity);
    // return res.send("ok");

    // Create contributions and save them to the database
    const contributionPromises = contributions.map((contribution: any) => {
      const contributionModel = new Contribution({
        userId: contribution.userId,
        activityId: savedActivity._id,
        amount: contribution.amount,
      });
      return contributionModel.save();
    });
    // console.log("contributionPromises", contributionPromises);
    await Promise.all(contributionPromises);

    res.status(201).json(savedActivity);
  } catch (error) {
    // //console.error(error);
    res.status(500).send("Server Error");
  }
};
