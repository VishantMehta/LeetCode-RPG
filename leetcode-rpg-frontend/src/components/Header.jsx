import { Link, useLocation } from 'react-router-dom';
import { Swords, Wand2, Shield, LayoutDashboard, LogOut } from 'lucide-react';

const Header = ({ username, onLogout }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Hub', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Skills', path: '/skills', icon: Wand2 },
    { name: 'Trophy Room', path: '/inventory', icon: Shield },
    { name: 'Activity', path: '/activity', icon: Swords },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto bg-darkCard border border-gray-700 rounded-2xl p-4 mb-6 mt-4 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-3">
        <Swords size={32} className="text-accent" />
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CodeQuest
        </h1>
        <span className="text-gray-500 ml-2">| Warrior: <span className="text-gray-200 font-bold">{username}</span></span>
      </div>

      <nav className="flex items-center gap-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 
                ${isActive 
                  ? 'bg-primary text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={onLogout}
        className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm font-bold transition-colors"
      >
        <LogOut size={18} />
        Exit Arena
      </button>
    </header>
  );
};

export default Header;