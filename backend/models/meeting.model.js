import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meetingId: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  speakers: [
    {
      name: String,
      duration: Number,
    },
  ],
  rawData: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
