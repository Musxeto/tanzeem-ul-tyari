import { useState } from 'react';

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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 minecraft-border p-8 bg-gradient-to-r from-green-900 to-black relative">
        <h1 className="minecraft-text text-5xl mb-4 text-lime-400">
          🚽 OPEN BATHROOM QEEMA HANGOUT 🍖
        </h1>
        <p className="text-lime-300 text-xl">Peak Chaotic Energy Zone</p>
        
        {/* Easter Egg Trigger - Hidden Pixel */}
        <div 
          onClick={triggerEasterEgg}
          className="absolute bottom-2 right-2 w-4 h-4 bg-lime-400 cursor-pointer hover:bg-lime-300"
          title="Click me!"
        ></div>
      </div>

      {/* Easter Egg Activation */}
      {easterEggActivated && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="minecraft-text text-6xl text-lime-400 blink animate-bounce">
              🚨 PANIC MODE ACTIVATED 🚨
            </h2>
            <p className="text-lime-300 text-3xl mt-4">UNITED BY PANIC!</p>
            <p className="text-lime-400 text-xl mt-2">*Chaotic screaming sounds*</p>
          </div>
        </div>
      )}

      {/* Qeema Counter */}
      <div className="minecraft-border bg-black p-8 mb-8 text-center">
        <h2 className="text-lime-400 text-4xl mb-4">🍖 QEEMA COUNTER 🍖</h2>
        <div className="minecraft-border bg-green-900 p-8 inline-block">
          <div className="text-lime-400 text-6xl minecraft-text mb-4">{qeemaCount}</div>
          <p className="text-lime-300 text-sm">Questionable meals consumed</p>
        </div>
        <div className="mt-6">
          <button 
            onClick={incrementQeema}
            className="minecraft-button text-2xl py-4 px-8"
          >
            + ADD ANOTHER QUESTIONABLE MEAL
          </button>
        </div>
      </div>

      {/* The Legend */}
      <div className="minecraft-border bg-black p-8 mb-8">
        <h2 className="text-lime-400 text-3xl text-center mb-6">📜 THE LEGEND 📜</h2>
        <div className="minecraft-border bg-green-900/30 p-6 text-lime-300 space-y-4">
          <p className="text-xl">
            In the darkest hours of the 5th semester finals, when hope was lost and sanity was a distant memory...
          </p>
          <p className="text-lg">
            Five brave souls gathered in the most unlikely of places: The Open Bathroom.
          </p>
          <p className="text-lg">
            Armed with nothing but determination, instant noodles, and a suspicious batch of qeema...
          </p>
          <p className="text-xl blink text-lime-400">
            They survived. Together. United by Panic.
          </p>
        </div>
      </div>

      {/* Gallery of Questionable Foods */}
      <div className="minecraft-border bg-black p-8">
        <h2 className="text-lime-400 text-3xl text-center mb-6">🎨 HALL OF FAME 🎨</h2>
        <p className="text-lime-300 text-center mb-6">A tribute to the meals that fueled our chaos</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionableFoods.map((food, idx) => (
            <div key={idx} className="minecraft-border bg-green-900/30 p-6 hover:bg-green-900/50 transition-colors">
              <div className="text-center mb-4 text-6xl">
                {idx === 4 ? '👑' : '🍽️'}
              </div>
              <h3 className="text-lime-400 font-bold text-xl mb-2 text-center">{food.name}</h3>
              <p className="text-lime-300 text-sm text-center mb-2 italic">{food.rating}</p>
              <p className="text-lime-200 text-xs text-center">{food.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Memorable Quotes */}
      <div className="minecraft-border bg-black p-8 mt-8">
        <h2 className="text-lime-400 text-3xl text-center mb-6">💬 MEMORABLE QUOTES 💬</h2>
        <div className="space-y-4">
          {[
            { quote: "Is this qeema or are we just hallucinating from sleep deprivation?", author: "Anonymous Member" },
            { quote: "The bathroom has better acoustics for our panic screams.", author: "The Big Dawg" },
            { quote: "I've calculated the probability of passing. It's... not good.", author: "The Genius" },
            { quote: "This is fine. Everything is fine. Nothing is fine.", author: "Kowalski" },
          ].map((quote, idx) => (
            <div key={idx} className="minecraft-border bg-green-900/30 p-4">
              <p className="text-lime-300 italic">"{quote.quote}"</p>
              <p className="text-lime-400 text-right text-sm mt-2">- {quote.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
