"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = exports.deleteActivity = exports.getActivityById = exports.getActivities = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const ActivityModel_1 = __importDefault(require("../models/ActivityModel"));
const ContributionModel_1 = __importDefault(require("../models/ContributionModel"));
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield ActivityModel_1.default.find();
        res.status(200).json(activities);
    }
    catch (error) {
        //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.getActivities = getActivities;
const getActivityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield ActivityModel_1.default.findById(req.params.id);
        if (!activity) {
            res.status(404).send("Activity not found");
        }
        else {
            res.status(200).json(activity);
        }
    }
    catch (error) {
        //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.getActivityById = getActivityById;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield ActivityModel_1.default.findByIdAndDelete(req.params.id);
        if (!activity) {
            res.status(404).send("Activity not found");
        }
        else {
            res.status(200).json(activity);
        }
    }
    catch (error) {
        //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.deleteActivity = deleteActivity;
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, totalBillAmount, contributions } = req.body;
        // console.log("contributions", contributions);
        // Check that all user IDs in the contributions array are valid
        const userIds = contributions.map((contribution) => contribution.userId);
        // console.log("userIds", userIds);
        const existingUsers = yield UserModel_1.default.find({ _id: { $in: userIds } });
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
        const activity = new ActivityModel_1.default({
            name,
            totalBillAmount,
            userIds: userIds,
        });
        const savedActivity = yield activity.save();
        // console.log("activity saved", savedActivity);
        // return res.send("ok");
        // Create contributions and save them to the database
        const contributionPromises = contributions.map((contribution) => {
            const contributionModel = new ContributionModel_1.default({
                userId: contribution.userId,
                activityId: savedActivity._id,
                amount: contribution.amount,
            });
            return contributionModel.save();
        });
        // console.log("contributionPromises", contributionPromises);
        yield Promise.all(contributionPromises);
        res.status(201).json(savedActivity);
    }
    catch (error) {
        // //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.createActivity = createActivity;
