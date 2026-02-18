import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Send, Quote } from 'lucide-react';

const philosophicalQuotes = [
  "The proletariat must rise against the oppression of... wait, what were we talking about? Oh yes, exams.",
  "In the dialectical materialism of academic struggle, the thesis is panic, the antithesis is more panic, and the synthesis is somehow passing.",
  "To quote Marx: 'The philosophers have only interpreted the syllabus; the point is to somehow memorize it.'",
  "Chai is the opiate of the stressed masses.",
  "From each according to their ability to cram, to each according to their caffeine needs.",
  "The history of all hitherto existing society is the history of class struggles... and semester finals.",
  "Workers of the world, unite! You have nothing to lose but your GPAs.",
  "I think, therefore I'm panicking about exams.",
  "The only thing we have to fear is fear itself... and the 5th semester finals.",
  "Cogito ergo sum caffeinated.",
  "In the grand tapestry of academic despair, we are but threads of controlled chaos.",
  "The bourgeoisie may have capital, but we have the capital letters of PANIC.",
  "One does not simply walk into the exam hall unprepared. But we did. Five times.",
  "The revolution will not be televised, but our panic attacks will be legendary.",
];

export default function ChaiLeaderPage() {
  const [currentQuote, setCurrentQuote] = useState("Click the chai tap to hear wisdom from the Leader!");
  const [bookingStatus, setBookingStatus] = useState("");
  const [chaiCount, setChaiCount] = useState(0);

  const tapChai = () => {
    const randomQuote = philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)];
    setCurrentQuote(randomQuote);
    setChaiCount(prev => prev + 1);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("Application processed... Leader is busy contemplating the proletariat. Please check back in 2-3 revolutionary cycles.");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring' }}
        className="text-center mb-8 minecraft-border p-8 bg-gradient-to-r from-mc-dark-green to-mc-darker glow"
      >
        <Coffee size={64} className="mx-auto mb-4 text-mc-beige animate-pulse" />
        <h1 className="minecraft-text text-3xl md:text-5xl mb-4 text-mc-beige">
          CHAI WITH THE LEADER
        </h1>
        <p className="text-mc-tan text-lg md:text-xl">Ghulam Mustafa: Socialist Marxist Philosopher</p>
      </motion.div>

      {/* Chai Tap Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="minecraft-border bg-mc-darker p-8 mb-8 glow"
      >
        <div className="text-center mb-6">
          <h2 className="minecraft-text text-xl md:text-3xl mb-4 text-mc-light-green">VIRTUAL CHAI TAP</h2>
          <motion.p 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-mc-tan mb-4"
          >
            Tap count: {chaiCount}
          </motion.p>
          <motion.button
            onClick={tapChai}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="minecraft-button text-lg md:text-3xl py-6 px-12 flex items-center gap-3 mx-auto"
          >
            <Coffee size={32} /> TAP FOR CHAI <Coffee size={32} />
          </motion.button>
        </div>
        
        <motion.div 
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="minecraft-border bg-mc-green/30 p-6 mt-6 shine"
        >
          <Quote className="text-gold mb-2" size={32} />
          <p className="text-mc-beige text-sm md:text-lg text-center leading-relaxed">
            "{currentQuote}"
          </p>
          <p className="text-mc-light-green text-right mt-4 italic">- The Leader</p>
        </motion.div>
      </motion.div>

      {/* Booking Form */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="minecraft-border bg-mc-darker p-8"
      >
        <h2 className="minecraft-text text-xl md:text-3xl text-center mb-6 text-mc-light-green flex items-center justify-center gap-3">
          <Send /> BOOK A CHAI SESSION
        </h2>
        <form onSubmit={handleBooking} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="text-mc-beige block mb-2 text-xs">Your Name:</label>
            <input
              type="text"
              required
              className="w-full p-3 minecraft-border bg-mc-dark-green/30 text-mc-beige"
              placeholder="Enter your name..."
            />
          </div>
          
          <div>
            <label className="text-mc-beige block mb-2 text-xs">Preferred Topic:</label>
            <select
              required
              className="w-full p-3 minecraft-border bg-mc-dark-green/30 text-mc-beige"
            >
              <option>Marxist Theory</option>
              <option>Exam Survival Strategies</option>
              <option>The Philosophy of Panic</option>
              <option>Chai Brewing Techniques</option>
              <option>Revolutionary Academic Practices</option>
            </select>
          </div>

          <div>
            <label className="text-mc-beige block mb-2 text-xs">Preferred Date:</label>
            <input
              type="date"
              required
              className="w-full p-3 minecraft-border bg-mc-dark-green/30 text-mc-beige"
            />
          </div>

          <div>
            <label className="text-mc-beige block mb-2 text-xs">Why do you want chai with the Leader?</label>
            <textarea
              required
              rows={4}
              className="w-full p-3 minecraft-border bg-mc-dark-green/30 text-mc-beige"
              placeholder="Describe your reasons..."
            ></textarea>
          </div>

          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="minecraft-button w-full py-4 text-xs md:text-xl flex items-center justify-center gap-2"
          >
            <Send size={20} /> SUBMIT REQUEST
          </motion.button>
        </form>

        {bookingStatus && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="minecraft-border bg-mc-green/30 p-4 mt-6 text-center"
          >
            <p className="text-mc-beige text-xs md:text-sm">{bookingStatus}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
