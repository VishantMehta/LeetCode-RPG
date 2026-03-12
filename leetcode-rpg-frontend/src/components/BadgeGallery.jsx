import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, Crown, Zap, Flame, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const BadgeGallery = ({ unlockedBadges = [] }) => {
  const [openedChests, setOpenedChests] = useState([]);

  useEffect(() => {
    const savedChests = JSON.parse(localStorage.getItem('opened_chests') || '[]');
    setOpenedChests(savedChests);
  }, []);

  const BADGES = [
    { id: 1, name: "Novice Solver", icon: Star, reqLevel: 5, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/30" },
    { id: 2, name: "Code Warrior", icon: Shield, reqLevel: 10, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-500/30" },
    { id: 3, name: "Flame Striker", icon: Flame, reqLevel: 15, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-500/30" },
    { id: 4, name: "Algorithm Mage", icon: Zap, reqLevel: 25, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-500/30" },
    { id: 5, name: "Crown of Logic", icon: Crown, reqLevel: 50, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-500/30" },
  ];

  const handleOpenChest = (badgeName) => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF4500', '#00FF00', '#00FFFF']
    });

    const newOpenedList = [...openedChests, badgeName];
    setOpenedChests(newOpenedList);
    localStorage.setItem('opened_chests', JSON.stringify(newOpenedList));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {BADGES.map((badge, index) => {
          const isUnlockedByLevel = unlockedBadges.includes(badge.name);
          const hasBeenOpened = openedChests.includes(badge.name);

          if (isUnlockedByLevel && hasBeenOpened) {
            return (
              <motion.div
                key={badge.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${badge.bg} ${badge.border} shadow-[0_0_15px_rgba(255,255,255,0.05)]`}
              >
                <div className={`mb-3 ${badge.color}`}>
                  <badge.icon size={40} strokeWidth={2} />
                </div>
                <p className="text-sm font-bold text-white">{badge.name}</p>
                <p className="text-xs text-green-400 mt-1 font-bold">Claimed!</p>
              </motion.div>
            );
          }

          if (isUnlockedByLevel && !hasBeenOpened) {
            return (
              <motion.div
                key={`chest-${badge.id}`}
                whileHover={{ scale: 1.05 }}
                className="relative p-4 rounded-xl border border-yellow-500/50 bg-yellow-500/10 flex flex-col items-center text-center cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                onClick={() => handleOpenChest(badge.name)}
              >
                <motion.div 
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="mb-3 text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                >
                  <Gift size={44} strokeWidth={2} />
                </motion.div>
                <p className="text-sm font-bold text-yellow-400 animate-pulse">Tap to Open!</p>
                <p className="text-xs text-gray-400 mt-1">Reward Ready</p>
                
                <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full -z-10 animate-pulse"></div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-4 rounded-xl border border-gray-800 bg-darkBg opacity-50 grayscale flex flex-col items-center text-center"
            >
              <div className="mb-3 text-gray-600">
                <badge.icon size={40} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-bold text-gray-500">???</p>
              <p className="text-xs text-gray-500 mt-1">Unlocks at Lvl {badge.reqLevel}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGallery;