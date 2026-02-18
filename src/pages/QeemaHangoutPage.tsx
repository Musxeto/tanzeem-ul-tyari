import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, AlertTriangle, Flame } from 'lucide-react';

export default function QeemaHangoutPage() {
  const [qeemaCount, setQeemaCount] = useState(42);
  const [easterEggActivated, setEasterEggActivated] = useState(false);

  const incrementQeema = () => {
    setQeemaCount(prev => prev + 1);
  };

  const triggerEasterEgg = () => {
    setEasterEggActivated(true);
    // Play the panic sound effect (simulated)
    setTimeout(() => setEasterEggActivated(false), 3000);
  };

  const questionableFoods = [
    { name: "Mystery Qeema", rating: "10/10 Chaos", desc: "No one knows what's in it, but everyone survived" },
    { name: "3 AM Instant Noodles", rating: "Desperation Level: Maximum", desc: "Cooked in the bathroom sink" },
    { name: "Cold Pizza from Yesterday", rating: "Still Better Than Nothing", desc: "Found behind the textbooks" },
    { name: "Expired Energy Drinks", rating: "Liquid Courage", desc: "Best before: Who cares?" },
    { name: "The Legendary Bathroom Qeema", rating: "ICONIC", desc: "You had to be there" },
    { name: "Samosas at 4 AM", rating: "Peak Panic Fuel", desc: "Cold but effective" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring' }}
        className="text-center mb-8 minecraft-border p-8 bg-gradient-to-r from-mc-dark-green to-mc-darker relative glow"
      >
        <Flame size={64} className="mx-auto mb-4 text-mc-tan animate-pulse" />
        <h1 className="minecraft-text text-3xl md:text-5xl mb-4 text-mc-beige">
          OPEN BATHROOM QEEMA HANGOUT
        </h1>
        <motion.p 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-mc-tan text-lg md:text-xl"
        >
          Peak Chaotic Energy Zone
        </motion.p>
        
        {/* Easter Egg Trigger - Hidden Pixel */}
        <motion.div 
          onClick={triggerEasterEgg}
          whileHover={{ scale: 2 }}
          className="absolute bottom-2 right-2 w-4 h-4 bg-mc-light-green cursor-pointer"
          title="Click me!"
        ></motion.div>
      </motion.div>

      {/* Easter Egg Activation */}
      <AnimatePresence>
        {easterEggActivated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <AlertTriangle size={128} className="mx-auto mb-6 text-mc-tan" />
                <h2 className="minecraft-text text-4xl md:text-6xl text-mc-light-green mb-6">
                  PANIC MODE ACTIVATED
                </h2>
              </motion.div>
              <p className="text-mc-beige text-2xl md:text-3xl mt-4">UNITED BY PANIC!</p>
              <motion.p 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="text-mc-tan text-xl mt-2"
              >
                *Chaotic screaming sounds*
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Qeema Counter */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="minecraft-border bg-mc-darker p-8 mb-8 text-center glow"
      >
        <h2 className="minecraft-text text-2xl md:text-4xl mb-4 text-mc-light-green flex items-center justify-center gap-3">
          <Sparkles /> QEEMA COUNTER <Sparkles />
        </h2>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="minecraft-border bg-mc-green p-8 inline-block"
        >
          <motion.div 
            key={qeemaCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-mc-beige text-5xl md:text-6xl minecraft-text mb-4"
          >
            {qeemaCount}
          </motion.div>
          <p className="text-mc-tan text-xs md:text-sm">Questionable meals consumed</p>
        </motion.div>
        <div className="mt-6">
          <motion.button 
            onClick={incrementQeema}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="minecraft-button text-sm md:text-2xl py-4 px-8 flex items-center gap-2 mx-auto"
          >
            <Plus size={24} /> ADD ANOTHER QUESTIONABLE MEAL
          </motion.button>
        </div>
      </motion.div>

      {/* The Legend */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="minecraft-border bg-mc-darker p-8 mb-8"
      >
        <h2 className="minecraft-text text-2xl md:text-3xl text-center mb-6 text-mc-light-green">THE LEGEND</h2>
        <div className="minecraft-border bg-mc-green/30 p-6 text-mc-beige space-y-4 shine">
          <p className="text-lg md:text-xl">
            In the darkest hours of the 5th semester finals, when hope was lost and sanity was a distant memory...
          </p>
          <p className="text-base md:text-lg">
            Five brave souls gathered in the most unlikely of places: The Open Bathroom.
          </p>
          <p className="text-base md:text-lg">
            Armed with nothing but determination, instant noodles, and a suspicious batch of qeema...
          </p>
          <motion.p 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg md:text-xl text-mc-light-green"
          >
            They survived. Together. United by Panic.
          </motion.p>
        </div>
      </motion.div>

      {/* Gallery of Questionable Foods */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="minecraft-border bg-mc-darker p-8"
      >
        <h2 className="minecraft-text text-2xl md:text-3xl text-center mb-6 text-mc-light-green">HALL OF FAME</h2>
        <p className="text-mc-beige text-center mb-6 text-xs md:text-sm">A tribute to the meals that fueled our chaos</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionableFoods.map((food, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="minecraft-border bg-mc-green/30 p-6 card-hover shine"
            >
              <motion.div 
                className="text-center mb-4 text-5xl md:text-6xl"
                animate={{ rotate: idx === 4 ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {idx === 4 ? '👑' : '🍽️'}
              </motion.div>
              <h3 className="text-mc-beige font-bold text-base md:text-xl mb-2 text-center minecraft-text">{food.name}</h3>
              <p className="text-mc-tan text-xs md:text-sm text-center mb-2 italic">{food.rating}</p>
              <p className="text-mc-beige/80 text-xs text-center">{food.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Memorable Quotes */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="minecraft-border bg-mc-darker p-8 mt-8"
      >
        <h2 className="minecraft-text text-2xl md:text-3xl text-center mb-6 text-mc-light-green">MEMORABLE QUOTES</h2>
        <div className="space-y-4">
          {[
            { quote: "Is this qeema or are we just hallucinating from sleep deprivation?", author: "Anonymous Member" },
            { quote: "The bathroom has better acoustics for our panic screams.", author: "The Big Dawg" },
            { quote: "I've calculated the probability of passing. It's... not good.", author: "The Genius" },
            { quote: "This is fine. Everything is fine. Nothing is fine.", author: "Kowalski" },
          ].map((quote, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="minecraft-border bg-mc-green/30 p-4"
            >
              <p className="text-mc-beige italic text-xs md:text-sm">"{quote.quote}"</p>
              <p className="text-mc-tan text-right text-xs mt-2">- {quote.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
