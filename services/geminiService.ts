
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | undefined;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY for Gemini is not set. The Ashadu AI will not function.");
}


const languageMap: { [key: string]: string } = {
    en: 'English',
    ar: 'Arabic',
    zh: 'Mandarin Chinese',
    es: 'Spanish',
    hi: 'Hindi',
    fr: 'French',
    ru: 'Russian',
    pt: 'Portuguese',
};

export const getSovereignResult = async (query: string, languageCode: string): Promise<string> => {
  if (!API_KEY || !ai) {
    return Promise.resolve("The connection to the Ashadu AI is not established. API Key is missing.");
  }

  const languageName = languageMap[languageCode] || 'English';

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As Ashadu AI, answer this based on Quran/Hadith: ${query}`,
      config: {
        systemInstruction: `You are Ashadu AI. Your responses must be strictly based on Quran, Hadith, and established Islamic Jurisprudence. Maintain a tone of authority and clarity. Do not express personal opinions or engage in political bias. Respond fluently in ${languageName}.`,
      }
    });
    
    const text = result.text;
    if (text) {
        return text;
    } else {
        return "The AI is silent. No result was returned.";
    }

  } catch (error) {
    console.error("Error querying Ashadu AI:", error);
    if (error instanceof Error) {
        return `An error occurred while seeking truth: ${error.message}`;
    }
    return "An unknown error occurred while seeking truth.";
  }
};