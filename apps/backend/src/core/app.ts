import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use("/user/", userRoutes);

export const PORT = process.env.PORT || 3001;

export default app;
