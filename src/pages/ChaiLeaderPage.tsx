import { useState } from 'react';

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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 minecraft-border p-8 bg-gradient-to-r from-green-900 to-black">
        <h1 className="minecraft-text text-5xl mb-4 text-lime-400">
          ☕ CHAI WITH THE LEADER ☕
        </h1>
        <p className="text-lime-300 text-xl blink">Ghulam Mustafa: Socialist Marxist Philosopher</p>
      </div>

      {/* Chai Tap Section */}
      <div className="minecraft-border bg-black p-8 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-lime-400 text-3xl mb-4">🫖 VIRTUAL CHAI TAP 🫖</h2>
          <p className="text-lime-300 mb-4">Tap count: {chaiCount}</p>
          <button
            onClick={tapChai}
            className="minecraft-button text-3xl py-6 px-12 transform hover:scale-110 transition-transform"
          >
            ☕ TAP FOR CHAI ☕
          </button>
        </div>
        
        <div className="minecraft-border bg-green-900/30 p-6 mt-6">
          <p className="text-lime-300 text-lg text-center italic minecraft-text">
            "{currentQuote}"
          </p>
          <p className="text-lime-400 text-right mt-4">- The Leader</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="minecraft-border bg-black p-8">
        <h2 className="text-lime-400 text-3xl text-center mb-6">📅 BOOK A CHAI SESSION 📅</h2>
        <form onSubmit={handleBooking} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="text-lime-400 block mb-2">Your Name:</label>
            <input
              type="text"
              required
              className="w-full p-3 minecraft-border bg-green-900/30 text-lime-300 focus:outline-none focus:border-lime-400"
              placeholder="Enter your name..."
            />
          </div>
          
          <div>
            <label className="text-lime-400 block mb-2">Preferred Topic:</label>
            <select
              required
              className="w-full p-3 minecraft-border bg-green-900/30 text-lime-300 focus:outline-none focus:border-lime-400"
            >
              <option>Marxist Theory</option>
              <option>Exam Survival Strategies</option>
              <option>The Philosophy of Panic</option>
              <option>Chai Brewing Techniques</option>
              <option>Revolutionary Academic Practices</option>
            </select>
          </div>

          <div>
            <label className="text-lime-400 block mb-2">Preferred Date:</label>
            <input
              type="date"
              required
              className="w-full p-3 minecraft-border bg-green-900/30 text-lime-300 focus:outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label className="text-lime-400 block mb-2">Why do you want chai with the Leader?</label>
            <textarea
              required
              rows={4}
              className="w-full p-3 minecraft-border bg-green-900/30 text-lime-300 focus:outline-none focus:border-lime-400"
              placeholder="Describe your reasons..."
            ></textarea>
          </div>

          <button type="submit" className="minecraft-button w-full py-4 text-xl">
            📤 SUBMIT REQUEST 📤
          </button>
        </form>

        {bookingStatus && (
          <div className="minecraft-border bg-red-900/30 p-4 mt-6 text-center">
            <p className="text-lime-400 blink">{bookingStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
}
