"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
const ActivityRouter_1 = __importDefault(require("./ActivityRouter"));
const ContributionRouter_1 = __importDefault(require("./ContributionRouter"));
const router = express_1.default.Router();
router.use("/users", UserRouter_1.default);
router.use("/activities", ActivityRouter_1.default);
router.use("/contribution", ContributionRouter_1.default);
exports.default = router;
