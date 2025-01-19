import { Router } from "express";
import { getUsers, postUser } from "../controllers/usercontrollers";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);

export default router;
