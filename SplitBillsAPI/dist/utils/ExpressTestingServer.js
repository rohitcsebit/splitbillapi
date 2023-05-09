"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import { connectToDb } from "../utils/ConnectToDB";
const routes_1 = __importDefault(require("../routes"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const dbUriTest = process.env.dbUriTest;
// const port = 3000;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// connectToDb(dbUriTest);
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.app.use("/api", routes_1.default);
// app.listen(port, () => {
//   console.log(`Server running on port http://localhost:${port}`);
//   console.log(
//     `All the api routes are available in the routes http://localhost:${port}/api`
//   );
// });
