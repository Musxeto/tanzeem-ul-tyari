import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ramadanTimings } from '../data/ramadanTimings';
import { Clock, Moon, Sun, Star, Users, Trophy } from 'lucide-react';

export default function HomePage() {
  const [countdown, setCountdown] = useState({ type: '', hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      const today = ramadanTimings[0]; // Use first day for demo
      
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
        target = new Date(now);
        target.setDate(target.getDate() + 1);
        target.setHours(sehrHour, sehrMin, 0, 0);
        type = 'SEHRI';
      }

      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ type, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section with Logo */}
      <motion.div variants={itemVariants} className="text-center mb-12 relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="relative inline-block mb-6"
        >
          <motion.div
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="logo-glow"
          >
            <img 
              src="/logo-light.png" 
              alt="Tanzeem-ul-TyarI Logo" 
              className="w-64 h-64 mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
          
          {/* Floating particles around logo */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-mc-light-green rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * Math.PI / 4) * 150],
                y: [0, Math.sin(i * Math.PI / 4) * 150],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="minecraft-text text-4xl md:text-6xl mb-4 gradient-text"
        >
          TANZEEM-UL-TYARI
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-mc-tan text-xl md:text-2xl mb-2"
        >
          🎓 FINAL EXAMS 🎓
        </motion.p>
        <motion.p 
          variants={itemVariants}
          className="text-mc-beige text-lg italic"
        >
          "United by Panic"
        </motion.p>
      </motion.div>

      {/* Islamic-styled Ramadan Countdown */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="islamic-border islamic-pattern p-8 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-gold"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-gold"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-gold"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-gold"></div>

          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="islamic-text text-3xl md:text-4xl mb-6 text-center text-gold flex items-center justify-center gap-3">
              <Moon className="animate-pulse" />
              RAMADAN 2026
              <Moon className="animate-pulse" />
            </h2>
            
            <div className="text-center mb-6">
              <p className="islamic-text text-xl text-gold-light mb-2">Time Until {countdown.type}</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {[
                  { value: countdown.hours, label: 'HOURS', icon: Clock },
                  { value: countdown.minutes, label: 'MINUTES', icon: Sun },
                  { value: countdown.seconds, label: 'SECONDS', icon: Star },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="minecraft-border bg-gradient-to-b from-mc-green to-mc-dark-green p-6 min-w-[120px]"
                  >
                    <item.icon className="mx-auto mb-2 text-gold" size={24} />
                    <motion.div 
                      className="countdown-digit"
                      key={item.value}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.div>
                    <div className="islamic-text text-mc-beige text-xs mt-2">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* The Council - Minecraft Style */}
      <motion.div variants={itemVariants} className="minecraft-border glow p-8 mb-12">
        <h2 className="minecraft-text text-2xl md:text-3xl text-center mb-8 flex items-center justify-center gap-3 text-mc-light-green">
          <Trophy className="text-gold" />
          THE LEADERSHIP COUNCIL
          <Trophy className="text-gold" />
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Ghulam Mustafa', title: 'Leader & Founder', persona: 'Socialist Marxist Philosopher', icon: '👑' },
            { name: 'Mudassar Bhatti', title: 'The Big Dawg', persona: 'Masculine ex-leader; Red-pilled energy', icon: '💪' },
            { name: 'Ahsan Ilahi', title: 'The Genius', persona: 'The mind behind the madness', icon: '🧠' },
            { name: 'Jhangir Ahmed', title: 'Higgs Boson', persona: 'Group spokesperson', icon: '⚛️' },
            { name: 'Faizan Ali', title: 'The Manager', persona: 'Keeping the chaos organized', icon: '📋' },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="minecraft-border bg-gradient-to-br from-mc-dark-green to-mc-darker p-6 card-hover shine relative"
            >
              <div className="text-5xl mb-3 text-center">{member.icon}</div>
              <h3 className="minecraft-text text-mc-beige text-sm mb-2">{member.name}</h3>
              <p className="text-gold text-xs mb-2 italic">{member.title}</p>
              <p className="text-mc-tan text-xs leading-relaxed">{member.persona}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Ramadan Timetable - Modern Islamic Design */}
      <motion.div variants={itemVariants} className="islamic-border islamic-pattern p-8">
        <h2 className="islamic-text text-3xl text-center mb-8 text-gold flex items-center justify-center gap-3">
          <Star className="animate-pulse" />
          Sehri & Iftar Timings
          <Star className="animate-pulse" />
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-mc-beige">
            <thead>
              <tr className="bg-gradient-to-r from-mc-dark-green to-mc-green">
                <th className="p-3 border-2 border-gold islamic-text text-sm">Day</th>
                <th className="p-3 border-2 border-gold islamic-text text-sm">Date</th>
                <th className="p-3 border-2 border-gold islamic-text text-sm">Day</th>
                <th className="p-3 border-2 border-gold islamic-text text-sm">Sehri</th>
                <th className="p-3 border-2 border-gold islamic-text text-sm">Iftar</th>
                <th className="p-3 border-2 border-gold islamic-text text-sm">Duration</th>
              </tr>
            </thead>
            <tbody>
              {ramadanTimings.map((day, idx) => (
                <motion.tr
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }}
                  className="hover:bg-mc-green/30 transition-colors"
                >
                  <td className="p-3 border border-gold/50 text-center font-bold text-gold">{day.day}</td>
                  <td className="p-3 border border-gold/50 text-center">{day.date}</td>
                  <td className="p-3 border border-gold/50 text-center">{day.dayName}</td>
                  <td className="p-3 border border-gold/50 text-center islamic-text text-sm">{day.sehr}</td>
                  <td className="p-3 border border-gold/50 text-center islamic-text text-sm">{day.iftar}</td>
                  <td className="p-3 border border-gold/50 text-center text-xs">{day.duration}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
