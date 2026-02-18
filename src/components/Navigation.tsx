import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="minecraft-border bg-black/80 p-4 mb-6 sticky top-0 z-50">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Link to="/" className="nav-link">
          🏠 HOME
        </Link>
        <Link to="/chai-leader" className="nav-link">
          ☕ CHAI WITH LEADER
        </Link>
        <Link to="/qeema-hangout" className="nav-link">
          🍖 QEEMA HANGOUT
        </Link>
        <Link to="/join-us" className="nav-link">
          📝 JOIN US
        </Link>
      </div>
      <div className="text-center mt-2">
        <marquee className="text-lime-400 text-sm blink">
          🌙 UNITED BY PANIC 🌙 Welcome to the Tanzeem-ul-Tyari Portal 🌙
        </marquee>
      </div>
    </nav>
  );
}
