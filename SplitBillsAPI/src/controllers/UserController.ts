import { Request, Response } from "express";
import User, { User as UserType } from "../models/UserModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this name already exists" });
    }
    const user: UserType = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    // //console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: UserType[] = await User.find();
    res.status(200).json(users);
  } catch (error) {
    //console.error(error);
    res.status(500).send("Server Error");
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user: UserType | null = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    //console.error(error);
    res.status(500).send("Server Error");
  }
};
