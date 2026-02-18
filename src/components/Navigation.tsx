import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Coffee, Utensils, UserPlus } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'HOME' },
    { to: '/chai-leader', icon: Coffee, label: 'CHAI' },
    { to: '/qeema-hangout', icon: Utensils, label: 'QEEMA' },
    { to: '/join-us', icon: UserPlus, label: 'JOIN US' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="minecraft-border bg-black/90 backdrop-blur-md p-2 sm:p-3 md:p-4 mb-4 md:mb-6 sticky top-0 z-50"
    >
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center items-center">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            
            return (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={item.to} 
                  className={`nav-link flex items-center gap-2 ${isActive ? 'bg-mc-green border-mc-light-green' : ''}`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          className="text-center mt-2 md:mt-4"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-mc-beige text-[8px] sm:text-[10px] md:text-xs overflow-hidden px-2">
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="whitespace-nowrap"
            >
              🌙 UNITED BY PANIC 🌙 Welcome to the Tanzeem-ul-Tyari Portal 🌙 Est. 5th Semester Finals 🌙
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
