export interface Step {
  id: number;
  title: string;
  instruction: string;
  placeholder: string;
  prompts: string[];
}

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Chuyện gì?",
    instruction: "Viết ra hoặc nói về điều đang xảy ra với bạn lúc này và cảm xúc đi cùng.",
    placeholder: "Điều gì vừa xảy ra vậy...",
    prompts: ["Sự việc cụ thể nào vừa khiến bạn thấy xao động?", "Cảm giác này đang hiện diện ở đâu trên cơ thể bạn?"]
  },
  {
    id: 2,
    title: "Nhớ gì?",
    instruction: "Điều này gợi bạn nhớ đến trải nghiệm nào trước đây? (Nếu không nhớ, bạn có thể bỏ qua).",
    placeholder: "Ký ức nào đang hiện về...",
    prompts: ["Bạn có thấy hình bóng của một sự kiện cũ nào trong cảm xúc này không?"]
  },
  {
    id: 3,
    title: "Ôi bé ơi",
    instruction: "Bắt đầu bằng 'Ôi bé ơi...' (hoặc tên bạn), công nhận và yêu thương cảm xúc này.",
    placeholder: "Ôi bé ơi, mình nghe thấy bạn...",
    prompts: ["Nếu được ôm chính mình lúc này, bạn muốn nói câu công nhận nào nhất?"]
  },
  {
    id: 4,
    title: "Về đây",
    instruction: "Đưa phần bị tổn thương đó về với bạn, và nhắc rằng bây giờ bạn đã an toàn.",
    placeholder: "Về đây với mình nhé...",
    prompts: ["Hãy tưởng tượng bạn đang đón phần tổn thương ấy về nhà. Nơi an toàn đó trông như thế nào?"]
  },
  {
    id: 5,
    title: "Đi lối này",
    instruction: "Chọn một cách phản ứng mới, một bước đi nhẹ nhàng để tiếp tục ngày hôm nay.",
    placeholder: "Hành động nhỏ mình chọn là...",
    prompts: ["Một hành động nhỏ xíu, khác với thói quen cũ, mà bạn muốn thử là gì?"]
  }
];
