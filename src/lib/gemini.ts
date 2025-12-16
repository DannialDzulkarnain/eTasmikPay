import { GoogleGenAI } from "@google/genai";

// Vite exposes client-safe env vars via import.meta.env.*
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGeminiResponse = async (prompt: string, roleContext: string): Promise<string> => {
  try {
    if (!ai) {
      console.error("Gemini API key is missing. Set VITE_GEMINI_API_KEY in your env.");
      return "Maaf, konfigurasi AI tidak lengkap. Sila hubungi pentadbir.";
    }

    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: `You are a helpful Islamic assistant for a Quran Hafazan application called eTasmikPay.
        Your goal is to assist ${roleContext}.
        If the user is an Ustaz, provide teaching tips, motivation for students, or explanations of Tajweed rules.
        If the user is a Parent, explain the meaning of Surahs, benefits of hafazan, or how to encourage their child.
        Keep answers concise, respectful, and culturally appropriate for a Malaysian Islamic context.
        Use Markdown for formatting.`,
      },
    });

    return response.text || "Maaf, saya tidak dapat menjawab permintaan itu sekarang.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, perkhidmatan AI sedang sibuk. Sila cuba sebentar lagi.";
  }
};
