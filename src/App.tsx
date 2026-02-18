import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <footer className="minecraft-border bg-black p-6 mt-12 text-center">
          <p className="text-lime-400 minecraft-text text-xl mb-2">
            🎓 TANZEEM-UL-TYARE 🎓
          </p>
          <p className="text-lime-300 text-sm">United by Panic | Est. 5th Semester Finals</p>
          <p className="text-lime-400 text-xs mt-2 blink">
            "We survived, somehow."
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
