import { Router } from "express";
import { getTeams } from "../controllers/teamControllers";

const router = Router();

router.get("/", getTeams);

export default router;
