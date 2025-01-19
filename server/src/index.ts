import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import searchRoutes from "./routes/searchRoutes";
import taskRoutes from "./routes/taskRoute";
import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";
import { PrismaClient } from "@prisma/client/extension";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is Home Route");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
