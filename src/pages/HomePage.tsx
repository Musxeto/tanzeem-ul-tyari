import { useState, useEffect } from 'react';
import { ramadanTimings } from '../data/ramadanTimings';

export default function HomePage() {
  const [countdown, setCountdown] = useState({ type: '', hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentDate = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      
      // Find today in Ramadan schedule
      const today = ramadanTimings.find(day => {
        const dayDate = day.date.includes('Feb') ? `02/${day.date.split(' ')[0]}` : `03/${day.date}`;
        return dayDate === currentDate;
      });

      if (today) {
        const [sehrHour, sehrMin] = today.sehr.split(':').map(Number);
        const [iftarHour, iftarMin] = today.iftar.split(':').map(Number);
        
        const sehrTime = new Date(now);
        sehrTime.setHours(sehrHour, sehrMin, 0, 0);
        
        const iftarTime = new Date(now);
        iftarTime.setHours(iftarHour, iftarMin, 0, 0);

        let target, type;
        if (now < sehrTime) {
          target = sehrTime;
          type = 'SEHRI';
        } else if (now < iftarTime) {
          target = iftarTime;
          type = 'IFTAR';
        } else {
          // Next day's Sehri
          const tomorrow = ramadanTimings[today.day];
          if (tomorrow) {
            target = new Date(now);
            target.setDate(target.getDate() + 1);
            const [nextSehrHour, nextSehrMin] = tomorrow.sehr.split(':').map(Number);
            target.setHours(nextSehrHour, nextSehrMin, 0, 0);
            type = 'SEHRI';
          }
        }

        if (target) {
          const diff = target.getTime() - now.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          setCountdown({ type, hours, minutes, seconds });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 minecraft-border p-8 bg-gradient-to-r from-green-900 to-black">
        <h1 className="minecraft-text text-6xl mb-4 animate-spin-slow inline-block text-lime-400">
          TANZEEM-UL-TYARE
        </h1>
        <p className="text-lime-400 text-2xl blink mt-4">🎓 FINAL EXAMS 🎓</p>
        <p className="text-lime-300 text-xl mt-2 italic">"United by Panic"</p>
      </div>

      {/* Countdown */}
      <div className="minecraft-border bg-black p-6 mb-8 text-center">
        <h2 className="text-lime-400 text-3xl mb-4 blink">⏰ TIME UNTIL {countdown.type} ⏰</h2>
        <div className="flex justify-center gap-4 text-4xl minecraft-text">
          <div className="minecraft-border p-4 bg-green-900">
            <div className="text-lime-400">{String(countdown.hours).padStart(2, '0')}</div>
            <div className="text-lime-300 text-sm">HOURS</div>
          </div>
          <div className="minecraft-border p-4 bg-green-900">
            <div className="text-lime-400">{String(countdown.minutes).padStart(2, '0')}</div>
            <div className="text-lime-300 text-sm">MINUTES</div>
          </div>
          <div className="minecraft-border p-4 bg-green-900">
            <div className="text-lime-400">{String(countdown.seconds).padStart(2, '0')}</div>
            <div className="text-lime-300 text-sm">SECONDS</div>
          </div>
        </div>
      </div>

      {/* The Council */}
      <div className="minecraft-border bg-black p-6 mb-8">
        <h2 className="text-lime-400 text-3xl text-center mb-6">👑 THE LEADERSHIP COUNCIL 👑</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Ghulam Mustafa', title: 'Leader & Founder', persona: 'Socialist Marxist Philosopher' },
            { name: 'Mudassar Bhatti', title: 'The Big Dawg', persona: 'Masculine ex-leader; Red-pilled energy' },
            { name: 'Ahsan Ilahi', title: 'The Genius', persona: 'The mind behind the madness; "Nasha Null"' },
            { name: 'Jhangir Ahmed', title: 'Higgs Boson / Kowalski', persona: 'Group spokesperson and fundamental particle' },
            { name: 'Faizan Ali', title: 'The Manager', persona: 'Keeping the chaos organized' },
          ].map((member, idx) => (
            <div key={idx} className="minecraft-border bg-green-900/30 p-4">
              <h3 className="text-lime-400 font-bold text-xl">{member.name}</h3>
              <p className="text-lime-300 text-sm italic">{member.title}</p>
              <p className="text-lime-200 text-xs mt-2">{member.persona}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ramadan Timetable */}
      <div className="minecraft-border bg-black p-6">
        <h2 className="text-lime-400 text-3xl text-center mb-6">🌙 RAMADAN 2026 TIMETABLE 🌙</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-lime-400 minecraft-text">
            <thead>
              <tr className="bg-green-900">
                <th className="p-2 border-2 border-lime-400">Day</th>
                <th className="p-2 border-2 border-lime-400">Date</th>
                <th className="p-2 border-2 border-lime-400">Day</th>
                <th className="p-2 border-2 border-lime-400">Sehr</th>
                <th className="p-2 border-2 border-lime-400">Iftar</th>
                <th className="p-2 border-2 border-lime-400">Duration</th>
              </tr>
            </thead>
            <tbody>
              {ramadanTimings.map((day) => (
                <tr key={day.day} className="hover:bg-green-900/50">
                  <td className="p-2 border border-lime-400 text-center">{day.day}</td>
                  <td className="p-2 border border-lime-400 text-center">{day.date}</td>
                  <td className="p-2 border border-lime-400 text-center">{day.dayName}</td>
                  <td className="p-2 border border-lime-400 text-center">{day.sehr}</td>
                  <td className="p-2 border border-lime-400 text-center">{day.iftar}</td>
                  <td className="p-2 border border-lime-400 text-center text-sm">{day.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
