import express from "express";
import multer from "multer";
import {
  uploadTranscript,
  generateSummary,
  generateExtraction,
  exportPdf,
} from "../controllers/meeting.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post(
  "/upload",
  protectRoute,
  upload.single("transcript"),
  uploadTranscript
);
router.post("/summary", generateSummary);
router.post("/extraction", generateExtraction);
router.post("/export", exportPdf);

export default router;
