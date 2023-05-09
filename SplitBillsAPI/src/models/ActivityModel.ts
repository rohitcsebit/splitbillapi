import mongoose, { Document, Schema } from "mongoose";

export interface Activity extends Document {
  name: string;
  totalBillAmount: number;
  userIds: string[];
}

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  totalBillAmount: {
    type: Number,
    required: true,
  },
  userIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

export default mongoose.model<Activity>("Activity", activitySchema);
