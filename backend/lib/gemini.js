import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export async function generateSummaryAndActions(transcript, type) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt;
    switch (type) {
      case "basic":
        prompt = `Provide a concise summary for the following meeting transcript:\n\n${transcript}`;
        break;
      case "advanced":
        prompt = `Provide a detailed and insightful summary for the following meeting transcript:\n\n${transcript}`;
        break;
      case "bulletin":
        prompt = `Extract key points from the following meeting transcript and list them as bullet points:\n\n${transcript}`;
        break;
      default:
        throw new Error(
          "Invalid summary type. Options: basic, advanced, bulletin."
        );
    }

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    return null;
  }
}
