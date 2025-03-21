import express from "express";
import dotenv from "dotenv";
import connectdb from "./lib/db.js";
import authrouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/meeting.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authrouter);
app.use("/api/meeting", router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectdb();
});
