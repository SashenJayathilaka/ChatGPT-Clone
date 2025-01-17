import { Router } from "express";
import {
  createTasks,
  getTasks,
  getUserTasks,
  updateTasks,
} from "../controllers/taskControllers";

const router = Router();

router.get("/", getTasks);
router.post("/", createTasks);
router.patch("/:taskId/status", updateTasks);
router.get("/user/:userId", getUserTasks);

export default router;
