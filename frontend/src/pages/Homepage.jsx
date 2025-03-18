import React, { useState, useEffect } from "react";
import useMeetingStore from "../store/usechatstore";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const {
    meetingId,
    summaryType,
    summary,
    extractedData,
    setSummaryType,
    uploadTranscript,
    generateSummary,
    generateExtraction,
    exportPdf,
    resetStore,
  } = useMeetingStore();

  useEffect(() => {
    resetStore();
  }, [resetStore]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-4">
        Meeting ID: {meetingId || "None Selected"}
      </h2>

      {/* Transcript Upload */}
      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={() => uploadTranscript(file)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Upload Transcript
        </button>
      </div>

      {/* Summary Type Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Summary Type:</label>
        <select
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="bulletin">Bulletin</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mb-4">
        <button
          onClick={generateSummary}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Generate Summary
        </button>
        <button
          onClick={generateExtraction}
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Extract Data
        </button>
        <button
          onClick={exportPdf}
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          Export as PDF
        </button>
      </div>

      {/* Display Summary */}
      {summary && (
        <div className="p-4 bg-gray-100 rounded mb-4">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <p className="text-sm whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {/* Display Extraction Data */}
      {extractedData && Object.keys(extractedData).length > 0 && (
        <div className="p-4 bg-gray-100 rounded mb-4">
          <h3 className="font-semibold mb-2">Extracted Details:</h3>
          <p className="text-sm whitespace-pre-wrap">
            Keywords:{" "}
            {Array.isArray(extractedData.keywords)
              ? extractedData.keywords.join(", ")
              : extractedData.keywords || "N/A"}
          </p>
          <p className="text-sm whitespace-pre-wrap">
            Due Dates:{" "}
            {Array.isArray(extractedData.dueDates)
              ? extractedData.dueDates.join(", ")
              : extractedData.dueDates || "N/A"}
          </p>
          <p className="text-sm whitespace-pre-wrap">
            Tasks:{" "}
            {Array.isArray(extractedData.tasks)
              ? extractedData.tasks.join(", ")
              : extractedData.tasks || "N/A"}
          </p>
          <p className="text-sm whitespace-pre-wrap">
            Priority:{" "}
            {Array.isArray(extractedData.priorityList)
              ? extractedData.priorityList.join(", ")
              : extractedData.priorityList || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
