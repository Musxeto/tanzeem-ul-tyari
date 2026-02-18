import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ramadanTimings } from '../data/ramadanTimings';
import { Clock, Moon, Sun, Star, Trophy } from 'lucide-react';

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
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
      <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12 relative px-2">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="relative inline-block mb-4 md:mb-6"
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
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto"
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
          className="minecraft-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 md:mb-4 gradient-text px-2 leading-tight"
        >
          TANZEEM-UL-TYARI
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-mc-tan text-base sm:text-lg md:text-xl lg:text-2xl mb-2"
        >
          🎓 FINAL EXAMS 🎓
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-mc-beige text-sm sm:text-base md:text-lg italic px-4"
        >
          "United by Panic"
        </motion.p>
      </motion.div>

      {/* Islamic-styled Ramadan Countdown */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="islamic-border islamic-pattern p-6 md:p-8 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-2 left-2 md:top-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-t-4 border-l-4 border-gold"></div>
          <div className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-t-4 border-r-4 border-gold"></div>
          <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-b-4 border-l-4 border-gold"></div>
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-b-4 border-r-4 border-gold"></div>

          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="islamic-text text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4 lg:mb-6 text-center text-gold flex items-center justify-center gap-2 flex-wrap">
              <Moon className="animate-pulse" size={20} />
              <span>RAMADAN 2026</span>
              <Moon className="animate-pulse" size={20} />
            </h2>

            <div className="text-center mb-3 md:mb-4 lg:mb-6">
              <p className="islamic-text text-sm sm:text-base md:text-lg lg:text-xl text-gold-light mb-2">Time Until {countdown.type}</p>
              <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
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
                    className="minecraft-border bg-gradient-to-b from-mc-green to-mc-dark-green p-3 md:p-6 min-w-[90px] md:min-w-[120px]"
                  >
                    <item.icon className="mx-auto mb-1 md:mb-2 text-gold" size={20} />
                    <motion.div
                      className="text-3xl md:text-5xl text-mc-beige minecraft-text"
                      key={item.value}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.div>
                    <div className="islamic-text text-mc-beige text-[8px] md:text-xs mt-1 md:mt-2">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Ramadan Timetable - Modern Islamic Design */}
      <motion.div
        variants={itemVariants}
        className="mb-12 relative"
      >
        {/* Background Islamic Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" className="text-gold" />
          </svg>
        </div>

        <div className="relative bg-gradient-to-br from-mc-darker via-mc-dark-green/20 to-mc-darker rounded-2xl p-4 md:p-8 shadow-2xl border-4 border-gold/30">
          {/* Header */}
          <div className="text-center mb-4 md:mb-6 lg:mb-8 px-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-3 md:mb-4"
            >
              <Moon size={32} className="text-gold mx-auto sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </motion.div>
            <h2 className="islamic-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 md:mb-3 text-gold leading-tight">
              Ramadan Prayer Times
            </h2>
            <p className="text-mc-tan text-xs sm:text-sm md:text-base">February 19 - March 20, 2026</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold"></div>
              <Star className="text-gold" size={16} />
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
          </div>

          {/* Modern Card Grid for Mobile, Table for Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gold/30">
                  <th className="p-4 text-left">
                    <div className="islamic-text text-gold text-sm flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                        <span className="text-gold">#</span>
                      </div>
                      Day
                    </div>
                  </th>
                  <th className="p-4 text-left islamic-text text-gold text-sm">Date</th>
                  <th className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <Sun className="text-gold-light mb-1" size={20} />
                      <span className="islamic-text text-gold text-sm">Sehri</span>
                    </div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <Moon className="text-gold-light mb-1" size={20} />
                      <span className="islamic-text text-gold text-sm">Iftar</span>
                    </div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <Clock className="text-gold-light mb-1" size={20} />
                      <span className="islamic-text text-gold text-sm">Duration</span>
                    </div>
                  </th>
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
                    whileHover={{ backgroundColor: 'rgba(74, 124, 89, 0.1)' }}
                    className="border-b border-gold/10 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/30">
                          <span className="islamic-text text-gold font-bold">{day.day}</span>
                        </div>
                        <span className="text-mc-beige font-semibold">{day.dayName}</span>
                      </div>
                    </td>
                    <td className="p-4 islamic-text text-mc-tan">{day.date}</td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-mc-green/20 px-4 py-2 rounded-lg border border-gold/20">
                        <Sun size={16} className="text-gold-light" />
                        <span className="islamic-text text-mc-beige text-lg">{day.sehr}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-mc-dark-green/30 px-4 py-2 rounded-lg border border-gold/20">
                        <Moon size={16} className="text-gold-light" />
                        <span className="islamic-text text-mc-beige text-lg">{day.iftar}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-mc-tan text-sm">{day.duration}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {ramadanTimings.map((day, idx) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-br from-mc-dark-green/30 to-mc-darker/50 rounded-xl p-4 border-2 border-gold/20 shadow-lg"
              >
                {/* Day Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border-2 border-gold/40">
                      <span className="islamic-text text-gold text-lg font-bold">{day.day}</span>
                    </div>
                    <div>
                      <p className="text-mc-beige font-bold text-lg">{day.dayName}</p>
                      <p className="text-mc-tan text-sm islamic-text">{day.date}</p>
                    </div>
                  </div>
                  <Star className="text-gold" size={20} />
                </div>

                {/* Prayer Times */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-mc-green/20 rounded-lg p-3 border border-gold/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun size={18} className="text-gold-light" />
                      <span className="text-mc-tan text-xs uppercase">Sehri</span>
                    </div>
                    <p className="islamic-text text-mc-beige text-2xl font-bold">{day.sehr}</p>
                  </div>
                  <div className="bg-mc-dark-green/30 rounded-lg p-3 border border-gold/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Moon size={18} className="text-gold-light" />
                      <span className="text-mc-tan text-xs uppercase">Iftar</span>
                    </div>
                    <p className="islamic-text text-mc-beige text-2xl font-bold">{day.iftar}</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="mt-3 flex items-center justify-center gap-2 text-mc-tan text-sm">
                  <Clock size={14} />
                  <span>{day.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Decoration */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          </div>
        </div>
      </motion.div>

      {/* The Council - Minecraft Style */}
      <motion.div variants={itemVariants} className="minecraft-border glow p-4 sm:p-6 md:p-8">
        <h2 className="minecraft-text text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center mb-4 sm:mb-6 md:mb-8 flex items-center justify-center gap-2 flex-wrap text-mc-light-green">
          <Trophy className="text-gold" size={24} />
          THE LEADERSHIP COUNCIL
          <Trophy className="text-gold" size={24} />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
              className="minecraft-border bg-gradient-to-br from-mc-dark-green to-mc-darker p-4 md:p-6 card-hover shine relative"
            >
              <div className="text-4xl md:text-5xl mb-3 text-center">{member.icon}</div>
              <h3 className="minecraft-text text-mc-beige text-xs md:text-sm mb-2">{member.name}</h3>
              <p className="text-gold text-xs mb-2 italic">{member.title}</p>
              <p className="text-mc-tan text-xs leading-relaxed">{member.persona}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
