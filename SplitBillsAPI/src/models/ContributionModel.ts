import * as mongoose from "mongoose";

export interface Contribution extends mongoose.Document {
  userId: string;
  activityId: string;
  amount: number;
  paid: boolean;
}

const contributionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
    // required: true,
  },
});

export default mongoose.model<Contribution>("Contribution", contributionSchema);
