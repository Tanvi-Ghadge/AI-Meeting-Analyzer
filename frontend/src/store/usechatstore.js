
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useMeetingStore = create((set, get) => ({
  meetingId: null,
  summaryType: "basic",
  summary: "",
  extractedData: {},

  setMeetingId: (id) =>
    set({
      meetingId: id,
      summary: "",
      extractedData: {},
    }),

  setSummaryType: (type) => set({ summaryType: type }),

  uploadTranscript: async (file) => {
    if (!file) return alert("Please select a file!");
    const formData = new FormData();
    formData.append("transcript", file);

    try {
      const { data } = await axiosInstance.post("/meeting/upload", formData);
      get().setMeetingId(data.meetingId);
      alert(`Uploaded! Meeting ID: ${data.meetingId}`);
    } catch (error) {
      alert("Upload failed!");
      console.error(error);
    }
  },

  generateSummary: async () => {
    const { meetingId, summaryType } = get();
    if (!meetingId) return alert("Please select a meeting first!");
    try {
      const { data } = await axiosInstance.post("/meeting/summary", {
        meetingId,
        type: summaryType,
      });
      set({ summary: data.summary });
    } catch (error) {
      alert("Summary generation failed!");
      console.error(error);
    }
  },

  generateExtraction: async () => {
    const { meetingId } = get();
    if (!meetingId) return alert("Please select a meeting first!");
    try {
      const { data } = await axiosInstance.post("/meeting/extraction", {
        meetingId,
      });
      set({ extractedData: data.extractedData });
    } catch (error) {
      alert("Data extraction failed!");
      console.error(error);
    }
  },

  exportPdf: async () => {
    const { meetingId } = get();
    if (!meetingId) return alert("Please select a meeting first!");
    try {
      const response = await axiosInstance.post(
        "/meeting/export",
        { meetingId },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `meeting-summary_${meetingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("PDF export failed!");
      console.error(error);
    }
  },

 
  resetStore: () =>
    set({
      meetingId: null,
      summaryType: "basic",
      summary: "",
      extractedData: {},
      meetingHistory: [],
    }),
}));

export default useMeetingStore;
