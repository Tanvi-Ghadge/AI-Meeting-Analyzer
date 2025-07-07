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
const allowedOrigins = [
  "https://ai-meeting-analyzer-vrdj.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for origin: " + origin));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());
app.use("/api/auth", authrouter);
app.use("/api/meeting", router);
app.get("/api/ping", (req, res) => {
  res.send("uptime");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectdb();
});
