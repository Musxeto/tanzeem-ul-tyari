import { useState } from 'react';

const impossibleQuestions = [
  { q: "How many hours of sleep did you get during finals week?", options: ["8 hours", "6 hours", "4 hours", "Sleep? What's that?"], correct: 3 },
  { q: "What is your primary study strategy?", options: ["Consistent daily review", "Cramming", "Panic-induced photographic memory", "Prayer and hope"], correct: 2 },
  { q: "Have you ever studied in an open bathroom?", options: ["Never", "Once", "Multiple times", "That's where I live now"], correct: 3 },
  { q: "What's your relationship with caffeine?", options: ["Don't drink it", "Occasional", "Daily necessity", "I have chai for blood"], correct: 3 },
  { q: "Pick the correct philosophical stance:", options: ["Optimistic realism", "Pessimistic nihilism", "Panicked existentialism", "Chai-fueled Marxism"], correct: 3 },
  { q: "How do you handle exam stress?", options: ["Meditation", "Exercise", "Organized planning", "Controlled chaos with the boys"], correct: 3 },
  { q: "What time do you consider 'late night studying'?", options: ["9 PM", "11 PM", "1 AM", "The sun is rising again"], correct: 3 },
  { q: "Your GPA after 5th semester finals was:", options: ["4.0", "3.5+", "Pass", "Don't ask"], correct: 3 },
  { q: "How many group study sessions turn into philosophical debates?", options: ["Never", "Rarely", "Sometimes", "Every single time"], correct: 3 },
  { q: "The best place to study is:", options: ["Library", "Dorm room", "Coffee shop", "Bathroom with qeema"], correct: 3 },
  { q: "How prepared were you for finals?", options: ["Very prepared", "Somewhat prepared", "Not prepared", "Wait, there were finals?"], correct: 3 },
  { q: "Your primary emotion during exams:", options: ["Confidence", "Mild concern", "Anxiety", "Pure, unfiltered PANIC"], correct: 3 },
  { q: "Who is the greatest philosopher?", options: ["Plato", "Aristotle", "Kant", "Ghulam Mustafa"], correct: 3 },
  { q: "How many syllabi have you actually read?", options: ["All of them", "Most", "Some", "Syl-la-what?"], correct: 3 },
  { q: "What's your exam day breakfast?", options: ["Healthy meal", "Toast", "Coffee", "Leftover qeema and regret"], correct: 3 },
];

export default function JoinUsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < impossibleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
      }, 3000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setIsProcessing(false);
  };

  if (isProcessing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="minecraft-border bg-black p-12 text-center">
          <h2 className="text-lime-400 text-4xl minecraft-text mb-8 blink">
            🔄 PROCESSING APPLICATION... 🔄
          </h2>
          <div className="space-y-4">
            <p className="text-lime-300 text-xl">Analyzing panic levels...</p>
            <p className="text-lime-300 text-xl">Calculating chaos compatibility...</p>
            <p className="text-lime-300 text-xl">Consulting with the council...</p>
            <div className="minecraft-border bg-green-900 h-8 w-full mt-8 overflow-hidden">
              <div className="bg-lime-400 h-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="minecraft-border bg-black p-8 text-center">
          <h2 className="text-lime-400 text-5xl minecraft-text mb-8 blink">
            📋 APPLICATION STATUS 📋
          </h2>
          
          <div className="minecraft-border bg-red-900/50 p-8 mb-8">
            <h3 className="text-lime-400 text-3xl mb-4">⏳ PENDING... PERMANENTLY ⏳</h3>
            <p className="text-lime-300 text-xl mb-4">
              Thank you for your interest in joining the Tanzeem-ul-Tyari.
            </p>
            <p className="text-lime-300 text-lg mb-4">
              Your application has been carefully reviewed by our council of panicked survivors.
            </p>
            <p className="text-lime-400 text-2xl font-bold mb-4">
              Unfortunately, no one can match the exact combination of preparation, panic, and bathroom qeema that defined the original five.
            </p>
            <p className="text-lime-300 text-lg italic">
              Your application status: <span className="blink">PENDING</span>
            </p>
            <p className="text-lime-300 text-sm mt-4">
              (Don't hold your breath)
            </p>
          </div>

          <div className="minecraft-border bg-green-900/30 p-6 mb-8">
            <h3 className="text-lime-400 text-2xl mb-4">The Council's Verdict:</h3>
            <div className="space-y-3 text-lime-300">
              <p>"Not enough socialist philosophy." - Ghulam Mustafa</p>
              <p>"Needs more red-pilled energy." - Mudassar Bhatti</p>
              <p>"Calculations show: insufficient panic levels." - Ahsan Ilahi</p>
              <p>"Analysis: Not enough chaos particles detected." - Jhangir Ahmed</p>
              <p>"Application organization: 2/10. Needs more disorder." - Faizan Ali</p>
            </div>
          </div>

          <div className="space-x-4">
            <button onClick={resetQuiz} className="minecraft-button py-3 px-6">
              🔄 TRY AGAIN (It won't help)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = impossibleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / impossibleQuestions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 minecraft-border p-8 bg-gradient-to-r from-green-900 to-black">
        <h1 className="minecraft-text text-5xl mb-4 text-lime-400">
          📝 JOIN THE TANZEEM 📝
        </h1>
        <p className="text-lime-300 text-xl">The Recruitment Trap</p>
        <p className="text-lime-400 text-sm mt-2 italic">Warning: This test is designed to be impossible</p>
      </div>

      {/* Progress Bar */}
      <div className="minecraft-border bg-black p-4 mb-8">
        <div className="flex justify-between text-lime-400 mb-2">
          <span>Question {currentQuestion + 1} of {impossibleQuestions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="minecraft-border bg-green-900 h-6 overflow-hidden">
          <div 
            className="bg-lime-400 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="minecraft-border bg-black p-8">
        <h2 className="text-lime-400 text-2xl mb-6 text-center">
          {question.q}
        </h2>

        <div className="space-y-4 max-w-2xl mx-auto">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="minecraft-button w-full py-4 text-lg text-left px-6 hover:bg-lime-400 hover:text-black transition-colors"
            >
              {String.fromCharCode(65 + idx)}. {option}
            </button>
          ))}
        </div>
      </div>

      {/* Fun Fact */}
      <div className="minecraft-border bg-black p-6 mt-8 text-center">
        <p className="text-lime-400 text-sm italic">
          💡 Fun Fact: All questions have a "correct" answer, but it won't matter in the end. Just like exams!
        </p>
      </div>
    </div>
  );
}
