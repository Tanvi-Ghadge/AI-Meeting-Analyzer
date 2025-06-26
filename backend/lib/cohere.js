

import cohere from "cohere-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const co = new cohere.CohereClientV2(process.env.CO_API_KEY);


export async function generateSummaryAndActions(transcript, type) {
  try {
    
    let prompt;
    switch (type) {
      case "basic":
        prompt = `Provide a well-structured and neatly formatted summary of the following meeting transcript, ensuring clarity and professionalism without any unnecessary symbols or special characters.\n\n${transcript}`;
        break;
      case "advanced":
        prompt = `Provide a detailed and well-structured summary of the following meeting transcript in a clear and professional format. Ensure the summary is insightful and properly formatted without any unnecessary symbols or special characters.\n\n${transcript}`;
        break;
      case "bulletin":
        prompt = `Extract the key points from the following meeting transcript and present them as a well-structured list using bullet points. Ensure the formatting is clear, professional, and visually appealing without any unnecessary symbols or special characters.\n\n${transcript}`;
        break;
      default:
        throw new Error(
          "Invalid summary type. Options: basic, advanced, bulletin."
        );
    }

    const response = await co.chat({
      model: "command-r-plus",
      messages: [{ role: "user", content: prompt }],
    });

    return response.message.content[0].text.trim();
  } catch (error) {
    console.error("Cohere generateresponse error:", error);
    return null;
  }
}