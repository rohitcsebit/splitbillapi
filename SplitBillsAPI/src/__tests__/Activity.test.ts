import { Request, Response } from "express";
import sinon from "sinon";
import * as ActivityController from "../controllers/ActivityController";
import User from "../models/UserModel";
import Activity from "../models/ActivityModel";
import Contribution from "../models/ContributionModel";

describe("ActivityController", () => {
  describe("createActivity", () => {
    let status: sinon.SinonStub;
    let send: sinon.SinonSpy;
    let res: { send: sinon.SinonSpy; status: sinon.SinonStub };
    let UserMock: sinon.SinonStub;
    let ActivityMock: sinon.SinonStub;
    let ContributionMock: sinon.SinonStub;
    let activityInstance: { save: sinon.SinonStub };
    let contributionInstance: { save: sinon.SinonStub };

    beforeEach(() => {
      status = sinon.stub();
      send = sinon.spy();
      res = { send, status };
      status.returns(res);

      //   activityInstance = {
      //     save: sinon.stub().resolves(),
      //   };
      activityInstance = {
        save: sinon.stub().resolves({ _id: "some_id" }),
      };

      contributionInstance = {
        save: sinon.stub().resolves(),
      };

      UserMock = sinon.stub(User, "find");
      ActivityMock = sinon
        .stub(Activity.prototype, "save")
        .callsFake(activityInstance.save);
      ContributionMock = sinon
        .stub(Contribution.prototype, "save")
        .callsFake(contributionInstance.save);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should create an activity", async () => {
      const req: Partial<Request> = {
        body: {
          name: "test activity",
          totalBillAmount: 100,
          contributions: [
            { userId: "user1", amount: 50 },
            { userId: "user2", amount: 50 },
          ],
        },
      };

      //   UserMock.resolves(req.body.contributions);
      const userIds = req.body.contributions.map(
        (contribution: { userId: any }) => contribution.userId
      );

      UserMock.resolves(req.body.contributions);

      await ActivityController.createActivity(
        req as Request,
        res as unknown as Response
      );

      sinon.assert.calledWith(UserMock, { _id: { $in: userIds } });
      sinon.assert.calledWith(status, 201);
      sinon.assert.calledOnce(activityInstance.save);
      sinon.assert.calledTwice(contributionInstance.save);
      sinon.assert.calledOnce(send);
    });

    //... rest of your tests
  });
});
