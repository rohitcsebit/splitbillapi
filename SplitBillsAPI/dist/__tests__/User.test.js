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
const sinon_1 = __importDefault(require("sinon"));
const UserController = __importStar(require("../controllers/UserController"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
describe("UserController", () => {
    describe("createUser", () => {
        let status;
        let send;
        let res;
        let UserMock;
        let userInstance;
        beforeEach(() => {
            status = sinon_1.default.stub();
            send = sinon_1.default.spy();
            res = { send, status };
            status.returns(res);
            userInstance = {
                save: sinon_1.default.stub().resolves(),
            };
            UserMock = sinon_1.default.stub(UserModel_1.default, "findOne");
            sinon_1.default.stub(UserModel_1.default.prototype, "save").callsFake(userInstance.save);
        });
        afterEach(() => {
            sinon_1.default.restore();
        });
        it("should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                body: {
                    name: "test",
                    email: "test@test.com",
                },
            };
            UserMock.resolves(null);
            yield UserController.createUser(req, res);
            sinon_1.default.assert.calledWith(status, 201);
            sinon_1.default.assert.calledOnce(userInstance.save);
            sinon_1.default.assert.calledOnceWithExactly(UserMock, { name: req.body.name });
        }));
        it("should not create a user if the name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                body: {
                    name: "test",
                    email: "test@test.com",
                },
            };
            // Mock a user that already exists
            const existingUser = {
                name: "test",
                email: "test@test.com",
            };
            UserMock.resolves(existingUser);
            yield UserController.createUser(req, res);
            sinon_1.default.assert.calledWith(status, 409);
            sinon_1.default.assert.notCalled(userInstance.save);
            sinon_1.default.assert.calledOnceWithExactly(UserMock, { name: req.body.name });
        }));
    });
});
// describe("UserController", () => {
//   describe("createUser", () => {
//     let status, json, res;
//     let mockUser: sinon.SinonMock;
//     beforeEach(() => {
//       status = sinon.stub();
//       json = sinon.spy();
//       res = { json, status };
//       status.returns(res);
//       mockUser = sinon.mock(User);
//     });
//     afterEach(() => {
//       sinon.restore();
//     });
//     it("should create a user", async () => {
//       const req: Partial<Request> = {
//         body: {
//           name: "test",
//           email: "test@test.com",
//         },
//       };
//       mockUser
//         .expects("findOne")
//         .withArgs({ name: req.body.name })
//         .resolves(null);
//       mockUser.expects("save").resolves();
//       await UserController.createUser(req as Request, res as Response);
//       sinon.assert.calledWith(status, 201);
//       sinon.assert.calledWith(
//         json,
//         sinon.match({ name: req.body.name, email: req.body.email })
//       );
//       mockUser.verify();
//     });
//     it("should return 409 if user exists", async () => {
//       const req: Partial<Request> = {
//         body: {
//           name: "test",
//           email: "test@test.com",
//         },
//       };
//       mockUser
//         .expects("findOne")
//         .withArgs({ name: req.body.name })
//         .resolves({});
//       await UserController.createUser(req as Request, res as Response);
//       sinon.assert.calledWith(status, 409);
//       sinon.assert.calledWith(json, {
//         error: "User with this name already exists",
//       });
//       mockUser.verify();
//     });
//     it("should return 500 on server error", async () => {
//       const req: Partial<Request> = {
//         body: {
//           name: "test",
//           email: "test@test.com",
//         },
//       };
//       mockUser.expects("findOne").withArgs({ name: req.body.name }).throws();
//       await UserController.createUser(req as Request, res as Response);
//       sinon.assert.calledWith(status, 500);
//       sinon.assert.calledWith(json, "Server Error");
//       mockUser.verify();
//     });
//   });
// });
// import request from "supertest";
// import { app } from "../utils/ExpressTestingServer";
// // import mocked from "ts-jest";
// import User, { User as UserType } from "../models/UserModel";
// // Mock the User.findOne and User.create methods
// jest.mock("../models/UserModel", () => ({
//   findOne: jest.fn(),
//   create: jest.fn(),
// }));
// describe("createUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("should create a new user", async () => {
//     // Mock the User.findOne method to return null (user does not exist)
//     //@ts-ignore
//     User.findOne.mockResolvedValue(null);
//     // Mock the User.create method to return a new user object
//     const newUser = {
//       _id: "123",
//       name: "John",
//       email: "john@example.com",
//     };
//     //@ts-ignore
//     User.create.mockResolvedValue(newUser);
//     // Make a POST request to create a new user
//     const res = await request(app)
//       .post("/api/users")
//       .send({ name: "John", email: "john@example.com" });
//     // Assert that the User.findOne and User.create methods were called with the expected arguments
//     expect(User.findOne).toHaveBeenCalledWith({ name: "John" });
//     expect(User.create).toHaveBeenCalledWith({
//       name: "John",
//       email: "john@example.com",
//     });
//     // Assert that the response status and body are as expected
//     expect(res.status).toBe(201);
//     expect(res.body).toEqual(newUser);
//   });
//   it("should return a 409 error if the user already exists", async () => {
//     // Mock the User.findOne method to return an existing user object
//     const existingUser = {
//       _id: "123",
//       name: "John",
//       email: "john@example.com",
//     };
//     //@ts-ignore
//     User.findOne.mockResolvedValue(existingUser);
//     // Make a POST request to create a new user with an existing name
//     const res = await request(app)
//       .post("/api/users")
//       .send({ name: "John", email: "john@example.com" });
//     // Assert that the User.findOne method was called with the expected argument
//     expect(User.findOne).toHaveBeenCalledWith({ name: "John" });
//     // Assert that the response status and body are as expected
//     expect(res.status).toBe(409);
//     expect(res.body).toEqual({ error: "User with this name already exists" });
//   });
// });
