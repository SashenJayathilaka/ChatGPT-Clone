import { Router } from "express";
import { search } from "../controllers/searchControllers";

const router = Router();

router.get("/", search);

export default router;
