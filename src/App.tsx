/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mic, 
  MicOff, 
  Send, 
  ArrowRight, 
  Home, 
  BookOpen, 
  CloudLightning, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Quote,
  MoreHorizontal
} from 'lucide-react';
import { STEPS } from './constants';
import { getWitnessReflection } from './geminiService';

type View = 'HOPE' | 'PRACTICE' | 'SUMMARY' | 'JOURNAL';

export default function App() {
  const [view, setView] = useState<View>('HOPE');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [inputs, setInputs] = useState<string[]>(new Array(STEPS.length).fill(''));
  const [reflections, setReflections] = useState<string[]>(new Array(STEPS.length).fill(''));
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock voice recording
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice-to-text
      setTimeout(() => {
        setIsRecording(false);
        const mockTexts = [
          "Mình thấy hơi lo lắng về buổi họp chiều nay.",
          "Nó làm mình nhớ lại hồi đi học bị cô giáo phê bình trước lớp.",
          "Ôi bé ơi, mình thương sự lo lắng này của bạn lắm.",
          "Về đây nhé, bây giờ mình đã lớn và có thể tự bảo vệ mình rồi.",
          "Mình sẽ đi dạo 10 phút trước khi vào họp."
        ];
        handleInputChange(mockTexts[currentStepIdx]);
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleInputChange = async (value: string) => {
    const newInputs = [...inputs];
    newInputs[currentStepIdx] = value;
    setInputs(newInputs);

    if (value.length > 10) {
      setIsGenerating(true);
      const reflection = await getWitnessReflection(STEPS[currentStepIdx].title, value);
      const newReflections = [...reflections];
      newReflections[currentStepIdx] = reflection;
      setReflections(newReflections);
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setView('SUMMARY');
    }
  };

  const renderHome = () => (
    <div className="flex flex-col min-h-screen p-6 pb-28">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border-2 border-primary-container/20">
            <img 
              src="https://picsum.photos/seed/vn-woman/100/100" 
              alt="Avatar" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Chào buổi sáng</p>
            <h1 className="font-serif text-2xl text-tertiary">Chào Quỳnh,</h1>
          </div>
        </div>
        <button className="text-tertiary/40">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <section className="mb-10">
        <h2 className="font-serif text-4xl font-black text-tertiary leading-tight mb-6">
          Hôm nay bạn thấy thế nào?
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {['Bình yên', 'Bối rối', 'Trân trọng'].map((mood) => (
            <button 
              key={mood}
              className="flex-shrink-0 px-5 py-2.5 bg-surface-variant/50 rounded-full text-sm font-medium text-tertiary border border-outline-variant/30 hover:bg-surface-variant active:scale-95 transition-all"
            >
              {mood === 'Bình yên' && '☀️ '}
              {mood === 'Bối rối' && '☁️ '}
              {mood === 'Trân trọng' && '❤️ '}
              {mood}
            </button>
          ))}
        </div>
      </section>

      <section className="relative group mb-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-container via-secondary-container to-tertiary-container rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
          <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="text-primary-container text-3xl" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-tertiary mb-2">Trở về với chính mình</h3>
          <p className="text-on-surface-variant mb-8 text-sm max-w-[240px]">Thực hành 5 bước giúp bạn chuyển hóa cảm giác và tìm lại sự cân bằng.</p>
          <button 
            onClick={() => setView('PRACTICE')}
            className="w-full h-16 sunset-gradient rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary-container/20 active:scale-95 transition-transform"
          >
            Bắt đầu thực hành 5 Bước
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-xl font-bold text-tertiary">Nhật ký gần đây</h3>
          <button className="text-sm font-bold text-primary underline underline-offset-4">Xem tất cả</button>
        </div>
        <div className="space-y-4">
          <div className="bg-surface-variant/40 p-6 rounded-2xl border border-outline-variant/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-2 py-1 rounded">20 thg 5</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-tertiary mb-2">Một buổi chiều tĩnh lặng</h4>
            <p className="text-sm text-on-surface-variant line-clamp-2">Hôm nay mình dành thời gian để ngồi im lặng và quan sát những suy nghĩ...</p>
          </div>
          <div className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://picsum.photos/seed/peace/600/400" 
              alt="Journal card" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tertiary/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-[10px] uppercase text-white/70 font-bold mb-1">Hôm qua</p>
              <h4 className="font-serif text-lg font-bold text-white leading-tight">Niềm vui từ những điều nhỏ</h4>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-center text-tertiary/40">
        <Quote className="mx-auto mb-4 opacity-20" size={32} />
        <p className="font-serif italic text-lg leading-relaxed px-4">
          "Hạnh phúc không phải là điểm đến, mà là hành trình trở về với chính mình."
        </p>
      </footer>
    </div>
  );

  const renderPractice = () => {
    const step = STEPS[currentStepIdx];
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setView('HOPE')} className="text-primary hover:opacity-70">
              <X size={24} />
            </button>
            <h1 className="font-serif font-bold text-lg text-primary">Bước {step.id}: {step.title}</h1>
            <div className="w-6" />
          </div>
          <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
            <motion.div 
              className="h-full sunset-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIdx + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </header>

        <main className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full flex flex-col">
          <motion.section 
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10"
          >
            <h2 className="font-serif text-3xl font-bold text-tertiary leading-tight mb-4">
              {step.instruction}
            </h2>
            <div className="w-16 h-1 bg-primary-container rounded-full" />
          </motion.section>

          <section className="mb-12">
            <div className="bg-white/60 rounded-3xl p-6 relative overflow-hidden group shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-3">
                <Sparkles size={12} className="animate-pulse" />
                AI Witnessing
              </div>
              <p className="text-on-surface-variant italic leading-relaxed min-h-[48px]">
                {isGenerating ? "Đang lắng nghe những rung động của bạn..." : (reflections[currentStepIdx] || "Đang lắng nghe những rung động trong lời kể của bạn...")}
              </p>
            </div>
          </section>

          <div className="mt-auto space-y-10 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-3">
              {step.prompts.map((prompt, i) => (
                <button 
                  key={i}
                  onClick={() => handleInputChange(prompt.split('?')[0] + '...')}
                  className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-on-surface-variant shadow-sm border border-outline-variant/10 active:scale-95 transition-all"
                >
                  {prompt.length > 25 ? prompt.substring(0, 25) + '...' : prompt}
                </button>
              ))}
            </div>

            <textarea 
              value={inputs[currentStepIdx]}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={step.placeholder}
              className="w-full h-32 bg-transparent border-0 focus:ring-0 text-xl font-serif text-tertiary placeholder:text-tertiary/20 resize-none"
            />

            <div className="relative flex items-center justify-center">
              <AnimatePresence>
                {isRecording && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.2 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="absolute w-24 h-24 bg-primary-container rounded-full"
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </AnimatePresence>
              <button 
                onClick={toggleRecording}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-90 ${isRecording ? 'bg-secondary' : 'sunset-gradient'}`}
              >
                {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
              </button>
            </div>
            <p className="text-[10px] font-bold text-tertiary/40 uppercase tracking-widest">
              {isRecording ? "Đang lắng nghe..." : "Nhấn để bắt đầu nói"}
            </p>

            <button 
              onClick={nextStep}
              className="mt-4 w-full h-16 bg-tertiary text-white rounded-full font-bold shadow-lg flex items-center justify-center gap-2 group active:scale-95 transition-all"
            >
              {currentStepIdx === STEPS.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </main>
      </div>
    );
  };

  const renderSummary = () => (
    <div className="flex flex-col min-h-screen bg-background p-6">
      <header className="flex justify-between items-center mb-10 pt-4">
         <X size={24} className="text-primary cursor-pointer" onClick={() => setView('HOPE')} />
         <h1 className="font-serif font-bold text-lg text-primary">Hoàn thành hành trình</h1>
         <div className="w-6" />
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full pb-40">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
              <img 
                src="https://picsum.photos/seed/lavender/400/400" 
                alt="Success" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary-container text-white p-3 rounded-full shadow-lg">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <h2 className="font-serif text-4xl font-bold text-tertiary mb-3">Tuyệt vời, bạn đã hoàn tất!</h2>
          <p className="text-on-surface-variant text-lg">Mọi bước đi nhỏ đều tạo nên sự thay đổi lớn. Bạn đã rất nỗ lực.</p>
        </div>

        <div className="space-y-6">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="bg-white/60 p-6 rounded-3xl border border-outline-variant/10">
              <div className="flex items-center gap-2 text-secondary font-bold text-[10px] uppercase tracking-widest mb-3">
                <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-[8px]">{idx + 1}</div>
                Bước {step.id}: {step.title}
              </div>
              <p className="text-tertiary font-medium mb-2">{inputs[idx] || "Bạn không để lại ghi chú cho bước này."}</p>
              {reflections[idx] && (
                <div className="mt-4 pt-4 border-t border-outline-variant/10">
                  <p className="text-xs text-on-surface-variant italic leading-relaxed">
                    <Sparkles size={10} className="inline mr-2 text-primary" />
                    {reflections[idx]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background to-transparent pt-10">
          <div className="max-w-md mx-auto space-y-4">
            <button 
              className="w-full h-16 sunset-gradient rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary-container/20 active:scale-95 transition-transform"
              onClick={() => alert("Đã gửi hành trình hôm nay cho Coach của bạn.")}
            >
              <Send size={20} />
              Gửi cho Coach
            </button>
            <button 
              className="w-full h-16 bg-white border-2 border-outline-variant/30 text-tertiary rounded-full font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
              onClick={() => setView('HOPE')}
            >
              Lưu vào nhật ký
            </button>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {view === 'HOPE' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderHome()}
          </motion.div>
        )}
        {view === 'PRACTICE' && (
          <motion.div 
            key="practice"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {renderPractice()}
          </motion.div>
        )}
        {view === 'SUMMARY' && (
          <motion.div 
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderSummary()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 w-full z-[60] flex justify-around items-center px-8 pb-8 pt-4 bg-background/80 backdrop-blur-xl border-t border-outline-variant/10 rounded-t-[2.5rem] shadow-lg">
        <button 
          onClick={() => setView('HOPE')}
          className={`flex flex-col items-center gap-1 transition-colors ${view === 'HOPE' ? 'text-primary' : 'text-tertiary/40'}`}
        >
          <Home size={24} fill={view === 'HOPE' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold tracking-widest uppercase">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-tertiary/40">
          <BookOpen size={24} />
          <span className="text-[10px] font-bold tracking-widest uppercase">Nhật ký</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-tertiary/40">
          <CloudLightning size={24} />
          <span className="text-[10px] font-bold tracking-widest uppercase">Hỗ trợ</span>
        </button>
      </nav>
    </div>
  );
}
