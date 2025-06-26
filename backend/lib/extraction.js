// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, "../.env") });

// export async function extractKeywords(transcript) {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `Extract the significant keywords from the following meeting transcript and present them in a clear, well-structured, and visually appealing format. Ensure the formatting is professional and free from any unnecessary symbols or special characters.\n\n${transcript}`;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error("Error generating summary:", error);
//     return null;
//   }
// }
// export async function extractDueDates(transcript) {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `Extract all due dates mentioned in the following meeting transcript along with their corresponding tasks. Present the information in a clear, structured, and professional format without any unnecessary symbols or special characters.\n\n${transcript}`;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error("Error generating summary:", error);
//     return null;
//   }
// }
// export async function extractTasks(transcript) {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `Extract all tasks from the following meeting transcript, specifically those marked by phrases such as "Task:" or "Action Item." Present them in a well-structured and professional bullet-point format, ensuring clarity and readability without any unnecessary symbols or special characters.:\n\n${transcript}`;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error("Error generating summary:", error);
//     return null;
//   }
// }
// export async function extractPriorityList(transcript) {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `Extract all sentences from the following meeting transcript that mention task priority (such as "high priority," "medium priority," or "low priority"). Present them in a clear, structured, and professional format, ensuring readability without any unnecessary symbols or special characters.\n\n${transcript}`;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error("Error generating summary:", error);
//     return null;
//   }
// }





import cohere from "cohere-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const co = new cohere.CohereClientV2(process.env.CO_API_KEY);


export async function extractKeywords(transcript) {
  try {
    
    const prompt = `Extract the significant keywords from the following meeting transcript and present them in a clear, well-structured, and visually appealing format. Ensure the formatting is professional and free from any unnecessary symbols or special characters.\n\n${transcript}`;

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
export async function  extractDueDates(transcript) {
  try {
    
    const prompt = `Extract all due dates mentioned in the following meeting transcript along with their corresponding tasks. Present the information in a clear, structured, and professional format without any unnecessary symbols or special characters.\n\n${transcript}`;

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
export async function extractTasks(transcript) {
  try {
    
    const prompt = `Extract all tasks from the following meeting transcript, specifically those marked by phrases such as "Task:" or "Action Item." Present them in a well-structured and professional bullet-point format, ensuring clarity and readability without any unnecessary symbols or special characters.:\n\n${transcript}`;

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
export async function extractPriorityList(transcript) {
  try {
    
    const prompt = `Extract all sentences from the following meeting transcript that mention task priority (such as "high priority," "medium priority," or "low priority"). Present them in a clear, structured, and professional format, ensuring readability without any unnecessary symbols or special characters.\n\n${transcript}`;

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