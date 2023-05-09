"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ActivityController_1 = require("../controllers/ActivityController");
const router = express_1.default.Router();
router.post("/", ActivityController_1.createActivity);
router.get("/", ActivityController_1.getActivities);
router.get("/:id", ActivityController_1.getActivityById);
router.delete("/:id", ActivityController_1.deleteActivity);
exports.default = router;
