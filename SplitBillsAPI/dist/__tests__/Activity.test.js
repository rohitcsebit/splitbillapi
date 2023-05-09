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
const ActivityController = __importStar(require("../controllers/ActivityController"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const ActivityModel_1 = __importDefault(require("../models/ActivityModel"));
const ContributionModel_1 = __importDefault(require("../models/ContributionModel"));
describe("ActivityController", () => {
    describe("createActivity", () => {
        let status;
        let send;
        let res;
        let UserMock;
        let ActivityMock;
        let ContributionMock;
        let activityInstance;
        let contributionInstance;
        beforeEach(() => {
            status = sinon_1.default.stub();
            send = sinon_1.default.spy();
            res = { send, status };
            status.returns(res);
            //   activityInstance = {
            //     save: sinon.stub().resolves(),
            //   };
            activityInstance = {
                save: sinon_1.default.stub().resolves({ _id: "some_id" }),
            };
            contributionInstance = {
                save: sinon_1.default.stub().resolves(),
            };
            UserMock = sinon_1.default.stub(UserModel_1.default, "find");
            ActivityMock = sinon_1.default
                .stub(ActivityModel_1.default.prototype, "save")
                .callsFake(activityInstance.save);
            ContributionMock = sinon_1.default
                .stub(ContributionModel_1.default.prototype, "save")
                .callsFake(contributionInstance.save);
        });
        afterEach(() => {
            sinon_1.default.restore();
        });
        it("should create an activity", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
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
            const userIds = req.body.contributions.map((contribution) => contribution.userId);
            UserMock.resolves(req.body.contributions);
            yield ActivityController.createActivity(req, res);
            sinon_1.default.assert.calledWith(UserMock, { _id: { $in: userIds } });
            sinon_1.default.assert.calledWith(status, 201);
            sinon_1.default.assert.calledOnce(activityInstance.save);
            sinon_1.default.assert.calledTwice(contributionInstance.save);
            sinon_1.default.assert.calledOnce(send);
        }));
        //... rest of your tests
    });
});
