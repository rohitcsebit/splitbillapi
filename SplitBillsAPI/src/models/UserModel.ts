import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<User>("User", UserSchema);
