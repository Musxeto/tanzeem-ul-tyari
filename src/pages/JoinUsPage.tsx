import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="minecraft-border bg-mc-darker p-12 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw size={64} className="mx-auto mb-8 text-mc-light-green" />
          </motion.div>
          <h2 className="minecraft-text text-2xl md:text-4xl mb-8 text-mc-beige">
            PROCESSING APPLICATION...
          </h2>
          <div className="space-y-4">
            {['Analyzing panic levels...', 'Calculating chaos compatibility...', 'Consulting with the council...'].map((text, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.5 }}
                className="text-mc-tan text-lg md:text-xl"
              >
                {text}
              </motion.p>
            ))}
            <div className="minecraft-border bg-mc-green h-8 w-full mt-8 overflow-hidden">
              <motion.div 
                className="bg-mc-light-green h-full"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 3 }}
              ></motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="minecraft-border bg-mc-darker p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <XCircle size={64} className="mx-auto mb-6 text-mc-tan" />
            <h2 className="minecraft-text text-2xl md:text-5xl mb-8 text-mc-beige">
              APPLICATION STATUS
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="minecraft-border bg-mc-green/30 p-8 mb-8 shine"
          >
            <AlertCircle size={48} className="mx-auto mb-4 text-gold" />
            <h3 className="minecraft-text text-lg md:text-3xl mb-4 text-mc-light-green">PENDING... PERMANENTLY</h3>
            <p className="text-mc-beige text-sm md:text-xl mb-4">
              Thank you for your interest in joining the Tanzeem-ul-Tyari.
            </p>
            <p className="text-mc-tan text-xs md:text-lg mb-4">
              Your application has been carefully reviewed by our council of panicked survivors.
            </p>
            <motion.p 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-mc-light-green text-base md:text-2xl font-bold mb-4 minecraft-text"
            >
              Unfortunately, no one can match the exact combination of preparation, panic, and bathroom qeema that defined the original five.
            </motion.p>
            <p className="text-mc-beige text-sm md:text-lg italic">
              Your application status: <span className="text-gold">PENDING</span>
            </p>
            <p className="text-mc-tan text-xs mt-4">
              (Don't hold your breath)
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="minecraft-border bg-mc-dark-green/30 p-6 mb-8"
          >
            <h3 className="minecraft-text text-lg md:text-2xl mb-4 text-mc-light-green">The Council's Verdict:</h3>
            <div className="space-y-3 text-mc-beige text-xs md:text-sm">
              {[
                { text: "Not enough socialist philosophy.", author: "Ghulam Mustafa" },
                { text: "Needs more red-pilled energy.", author: "Mudassar Bhatti" },
                { text: "Calculations show: insufficient panic levels.", author: "Ahsan Ilahi" },
                { text: "Analysis: Not enough chaos particles detected.", author: "Jhangir Ahmed" },
                { text: "Application organization: 2/10. Needs more disorder.", author: "Faizan Ali" },
              ].map((verdict, idx) => (
                <motion.p
                  key={idx}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                >
                  "{verdict.text}" - <span className="text-mc-tan italic">{verdict.author}</span>
                </motion.p>
              ))}
            </div>
          </motion.div>

          <div className="space-x-4">
            <motion.button 
              onClick={resetQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="minecraft-button py-3 px-6 flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={20} /> TRY AGAIN (It won't help)
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const question = impossibleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / impossibleQuestions.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' }}
        className="text-center mb-8 minecraft-border p-8 bg-gradient-to-r from-mc-dark-green to-mc-darker glow"
      >
        <CheckCircle size={64} className="mx-auto mb-4 text-mc-tan" />
        <h1 className="minecraft-text text-3xl md:text-5xl mb-4 text-mc-beige">
          JOIN THE TANZEEM
        </h1>
        <p className="text-mc-tan text-lg md:text-xl">The Recruitment Trap</p>
        <p className="text-mc-tan text-xs md:text-sm mt-2 italic">Warning: This test is designed to be impossible</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="minecraft-border bg-mc-darker p-4 mb-8"
      >
        <div className="flex justify-between text-mc-beige mb-2 text-xs md:text-sm">
          <span>Question {currentQuestion + 1} of {impossibleQuestions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="minecraft-border bg-mc-green h-6 overflow-hidden">
          <motion.div 
            className="bg-mc-light-green h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </motion.div>

      {/* Question */}
      <motion.div 
        key={currentQuestion}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        className="minecraft-border bg-mc-darker p-8"
      >
        <h2 className="text-mc-beige text-base md:text-2xl mb-6 text-center minecraft-text">
          {question.q}
        </h2>

        <div className="space-y-4 max-w-2xl mx-auto">
          {question.options.map((option, idx) => (
            <motion.button
              key={idx}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleAnswer(idx)}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              className="minecraft-button w-full py-4 text-xs md:text-lg text-left px-6"
            >
              <span className="text-gold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Fun Fact */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="minecraft-border bg-mc-dark-green/30 p-6 mt-8 text-center"
      >
        <p className="text-mc-tan text-xs md:text-sm italic">
          💡 Fun Fact: All questions have a "correct" answer, but it won't matter in the end. Just like exams!
        </p>
      </motion.div>
    </motion.div>
  );
}
