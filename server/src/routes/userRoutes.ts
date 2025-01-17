import { Router } from "express";
import { getUsers } from "../controllers/usercontrollers";

const router = Router();

router.get("/", getUsers);

export default router;
