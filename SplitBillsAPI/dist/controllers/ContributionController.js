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
exports.payAllContributionsForUser = exports.payContribution = exports.getContributionsByActivityId = exports.getContributionsByUserId = void 0;
const ContributionModel_1 = __importDefault(require("../models/ContributionModel"));
const getContributionsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const contributions = yield ContributionModel_1.default.find({ userId });
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
    }
    catch (error) {
        // //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.getContributionsByUserId = getContributionsByUserId;
const getContributionsByActivityId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityId = req.params.activityId;
        const contributions = yield ContributionModel_1.default.find({
            activityId,
        });
        res.status(200).json(contributions);
    }
    catch (error) {
        //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.getContributionsByActivityId = getContributionsByActivityId;
// Mark a contribution as paid
const payContribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contributionId = req.params.contributionId;
        const contribution = yield ContributionModel_1.default.findById(contributionId);
        // console.log("contributionId", contributionId);
        if (!contribution) {
            return res.status(404).json({ error: "Contribution not found" });
        }
        contribution.paid = true;
        yield contribution.save();
        res.status(200).json(contribution);
    }
    catch (error) {
        // //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.payContribution = payContribution;
// Mark all contributions for a user as paid for a specific activity
const payAllContributionsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const contributions = yield ContributionModel_1.default.find({
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
        yield Promise.all(updatedContributions);
        res
            .status(200)
            .json({ message: "All contributions for user marked as paid" });
    }
    catch (error) {
        //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.payAllContributionsForUser = payAllContributionsForUser;
