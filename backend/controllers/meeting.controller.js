import { readFile } from "fs/promises";
import path from "path";
import Meeting from "../models/meeting.model.js";
import Summary from "../models/summary.model.js";
import PDFDocument from "pdfkit";
import { generateSummaryAndActions } from "../lib/cohere.js";
import {
  extractDueDates,
  extractKeywords,
  extractPriorityList,
  extractTasks,
} from "../lib/extraction.js";

export const uploadTranscript = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join(process.cwd(), req.file.path);

  try {
    const data = await readFile(filePath, "utf8");

    const meeting = new Meeting({
      userId: req.user?._id || "guest",
      meetingId: req.body.meetingId || Date.now().toString(),
      transcript: data,
      startTime: req.body.startTime ? new Date(req.body.startTime) : new Date(),
      endTime: req.body.endTime ? new Date(req.body.endTime) : new Date(),
      rawData: {},
    });

    const savedMeeting = await meeting.save();
    res
      .status(200)
      .json({ meetingId: savedMeeting.meetingId, meeting: savedMeeting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateSummary = async (req, res) => {
  const { meetingId, type } = req.body;
  console.log("Received summary type:", type);

  if (!meetingId) {
    return res.status(400).json({ message: "Meeting ID is required" });
  }

  try {
    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    const transcript = meeting.transcript;
    const summaryOutput = await generateSummaryAndActions(transcript, type);
    if (!summaryOutput) {
      return res.status(500).json({ message: "Failed to generate summary." });
    }

    const summary = new Summary({
      meetingId: meeting._id,
      summaryText: summaryOutput,
      summaryType: type,
    });
    await summary.save();

    res
      .status(200)
      .json({ meetingId: meeting.meetingId, summary: summaryOutput });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const generateExtraction = async (req, res) => {
  const { meetingId } = req.body;

  if (!meetingId) {
    return res.status(400).json({ message: "Meeting ID is required" });
  }

  try {
    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    const transcript = meeting.transcript;
    const keywords = await extractKeywords(transcript);
    const dueDates = await extractDueDates(transcript);
    const tasks = await extractTasks(transcript);
    const priorityList = await extractPriorityList(transcript);
    let summary = await Summary.findOne({ meetingId: meeting._id });
    if (summary) {
      summary.extractedData = { keywords, dueDates, tasks, priorityList };
      await summary.save();
    } else {
      summary = new Summary({
        meetingId: meeting._id,
        summaryText: "",
        summaryType: "basic",
        extractedData: { keywords, dueDates, tasks, priorityList },
      });
      await summary.save();
    }
    res.status(200).json({
      meetingId: meeting.meetingId,
      extractedData: { keywords, dueDates, tasks, priorityList },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const exportPdf = async (req, res) => {
  const { meetingId } = req.body;

  if (!meetingId) {
    return res.status(400).json({ message: "Meeting ID is required" });
  }

  try {
    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    const summary = await Summary.findOne({ meetingId: meeting._id });

    const doc = new PDFDocument();

    res.setHeader(
      "Content-disposition",
      "attachment; filename=meeting-summary.pdf"
    );
    res.setHeader("Content-type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Meeting Summary & Extraction", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Meeting ID: ${meeting.meetingId}`);
    doc.text(`Uploaded by: ${meeting.userId}`);
    doc.text(`Meeting Date: ${meeting.createdAt.toLocaleDateString()}`);
    doc.moveDown();

    if (summary) {
      doc.fontSize(16).text("Summary:", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).text(summary.summaryText || "No summary available.");
      doc.moveDown();
    } else {
      doc.fontSize(12).text("No summary data available.");
      doc.moveDown();
    }

    if (summary && summary.extractedData) {
      const { keywords, dueDates, tasks, priorityList } = summary.extractedData;
      doc.fontSize(16).text("Extraction Details:", { underline: true });
      doc.moveDown(0.5);
      doc
        .fontSize(12)
        .text("Keywords: " + (keywords.length ? keywords.join(", ") : "N/A"));
      doc.moveDown(0.5);
      doc.text("Due Dates: " + (dueDates.length ? dueDates.join(", ") : "N/A"));
      doc.moveDown(0.5);
      doc.text("Tasks: " + (tasks.length ? tasks.join(", ") : "N/A"));
      doc.moveDown(0.5);
      doc.text(
        "Priority: " + (priorityList.length ? priorityList.join(", ") : "N/A")
      );
    } else {
      doc.fontSize(12).text("No extraction details available.");
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
