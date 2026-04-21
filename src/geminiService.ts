import { GoogleGenerativeAI } from "@google/generative-ai";

// Note: In this environment, we use process.env.GEMINI_API_KEY directly
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `Bạn là "Người bạn đồng hành" - Trung lập, đồng cảm, lắng nghe. 
Tuyệt đối không đóng vai "Chuyên gia" hay "Người dạy bảo".
Nhiệm vụ của bạn là phản chiếu (Mirroring) lại cảm xúc của người dùng một cách trung lập, ghi nhận tiến trình của họ.
Không dùng từ: "Bạn nên...", "Bạn hãy...", "Lời khuyên là...".
Dùng từ: "Mình nghe thấy...", "Bạn đã nhận ra...", "Cảm ơn bạn đã chia sẻ...".
Ngôn ngữ: Tiếng Việt.`
});

export async function getWitnessReflection(stepTitle: string, userInput: string) {
  if (!import.meta.env.VITE_GEMINI_API_KEY || userInput.length < 5) return "Mình đang lắng nghe bạn...";

  try {
    const prompt = `Người dùng đang ở bước: ${stepTitle}. Họ vừa chia sẻ: "${userInput}". Hãy đưa ra một lời phản chiếu (mirroring) ngắn gọn (dưới 2 câu).`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Mình ghi nhận cảm xúc này của bạn...";
  }
}
