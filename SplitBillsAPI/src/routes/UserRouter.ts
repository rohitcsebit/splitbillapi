import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
} from "../controllers/UserController";

const router: Router = express.Router();

router.get("/", getUsers);
// router.get('/:id', getSingleUser);
router.post("/", createUser);
// router.put('/:id', updateUserDetails);
router.delete("/:id", deleteUser);

export default router;
