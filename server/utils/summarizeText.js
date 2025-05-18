import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();

// Summarize function

const summarizeText = async (transcript) => {
    try {
        if (!transcript) return "Transcript is empty.";

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Summarize the following transcript in 2-3 paragraphs:\n\n${transcript}`
        });
        const summary = response.text.trim();
        return summary;
    } catch (error) {
        console.error("❌ Error summarizing text:", error);
        return "⚠️ Summary generation failed.";
    }
};

export default summarizeText;
