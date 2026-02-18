import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ChaiLeaderPage from './pages/ChaiLeaderPage';
import QeemaHangoutPage from './pages/QeemaHangoutPage';
import JoinUsPage from './pages/JoinUsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chai-leader" element={<ChaiLeaderPage />} />
          <Route path="/qeema-hangout" element={<QeemaHangoutPage />} />
          <Route path="/join-us" element={<JoinUsPage />} />
        </Routes>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="minecraft-border bg-mc-darker p-4 sm:p-6 mt-8 md:mt-12 text-center glow"
        >
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-mc-beige minecraft-text text-sm sm:text-base md:text-lg lg:text-xl mb-2"
          >
            TANZEEM-UL-TYARI
          </motion.p>
          <p className="text-mc-tan text-[10px] sm:text-xs md:text-sm">United by Panic | Est. 5th Semester Finals</p>
          <motion.p
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-mc-light-green text-xs mt-2"
          >
            "We survived, somehow."
          </motion.p>
        </motion.footer>
      </div>
    </Router>
  );
}

export default App;
