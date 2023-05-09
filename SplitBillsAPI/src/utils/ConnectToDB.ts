import mongoose from "mongoose";

export const connectToDb = async (dbUri: string) => {
  try {
    // mongoose.set("debug", true);
    await mongoose.connect(dbUri);
    console.info("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
