import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Safely handle API Key access to prevent runtime crashes in browser environments
const getApiKey = () => {
  try {
    // Check if process.env exists (Node/Webpack)
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    // Check for Vite environment variable
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    console.warn("Could not access environment variables");
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const MODEL_NAME = 'gemini-3-flash-preview';

/**
 * AI Tutor for Students: Explains concepts based on subject and query.
 */
export const askAITutor = async (subject: string, question: string): Promise<string> => {
  try {
    const prompt = `
      أنت معلم خبير في المنهج السعودي. 
      المادة: ${subject}.
      سؤال الطالب: ${question}.
      
      اشرح الإجابة بشكل مبسط وواضح ومناسب لمستوى الطالب المدرسي. استخدم نقاط وتنسيق واضح.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response for chat
      }
    });

    return response.text || "عذراً، لم أتمكن من توليد الإجابة في الوقت الحالي.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "حدث خطأ أثناء الاتصال بالمعلم الذكي. يرجى المحاولة لاحقاً.";
  }
};

/**
 * AI Lesson Planner for Teachers: Generates lesson plans or quizzes.
 */
export const generateLessonPlan = async (topic: string, gradeLevel: string): Promise<string> => {
  try {
    const prompt = `
      أنت مستشار تربوي خبير.
      المطلوب: إعداد خطة درس مختصرة أو أفكار إبداعية لشرح درس.
      الموضوع: ${topic}.
      الصف الدراسي: ${gradeLevel}.
      
      الخطة يجب أن تحتوي على:
      1. الأهداف التعليمية.
      2. استراتيجية التعلم المقترحة.
      3. نشاط تفاعلي للطلاب.
      4. سؤالين للتقويم الختامي.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "عذراً، لم أتمكن من تحضير الدرس.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "حدث خطأ أثناء الاتصال بالمساعد الذكي.";
  }
};