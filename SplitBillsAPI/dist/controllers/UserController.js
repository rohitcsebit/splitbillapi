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
exports.deleteUser = exports.getUsers = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const existingUser = yield UserModel_1.default.findOne({ name });
        if (existingUser) {
            return res
                .status(409)
                .json({ error: "User with this name already exists" });
        }
        const user = new UserModel_1.default({ name, email });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        // //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send("User not found");
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        //console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.deleteUser = deleteUser;
