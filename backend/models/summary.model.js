import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
    summaryText: {
      type: String,
    },
    actionItems: [
      {
        type: String,
      },
    ],
    summaryType: {
      type: String,
      enum: ["basic", "advanced", "bulletin"],
      default: "basic",
    },

    extractedData: {
      keywords: { type: [String], default: [] },
      dueDates: { type: [String], default: [] },
      tasks: { type: [String], default: [] },
      priorityList: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

const Summary = mongoose.model("Summary", SummarySchema);
export default Summary;
