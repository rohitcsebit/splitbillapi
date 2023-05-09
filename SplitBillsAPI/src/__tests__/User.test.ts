import { Request, Response } from "express";
import sinon from "sinon";
import * as UserController from "../controllers/UserController";
import User from "../models/UserModel";

describe("UserController", () => {
  describe("createUser", () => {
    let status: sinon.SinonStub;
    let send: sinon.SinonSpy;
    let res: { send: sinon.SinonSpy; status: sinon.SinonStub };
    let UserMock: sinon.SinonStub;
    let userInstance: { save: sinon.SinonStub };

    beforeEach(() => {
      status = sinon.stub();
      send = sinon.spy();
      res = { send, status };
      status.returns(res);

      userInstance = {
        save: sinon.stub().resolves(),
      };

      UserMock = sinon.stub(User, "findOne");
      sinon.stub(User.prototype, "save").callsFake(userInstance.save);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should create a user", async () => {
      const req: Partial<Request> = {
        body: {
          name: "test",
          email: "test@test.com",
        },
      };

      UserMock.resolves(null);

      await UserController.createUser(
        req as Request,
        res as unknown as Response
      );

      sinon.assert.calledWith(status, 201);
      sinon.assert.calledOnce(userInstance.save);
      sinon.assert.calledOnceWithExactly(UserMock, { name: req.body.name });
    });

    it("should not create a user if the name already exists", async () => {
      const req: Partial<Request> = {
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

      await UserController.createUser(
        req as Request,
        res as unknown as Response
      );

      sinon.assert.calledWith(status, 409);
      sinon.assert.notCalled(userInstance.save);
      sinon.assert.calledOnceWithExactly(UserMock, { name: req.body.name });
    });
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
