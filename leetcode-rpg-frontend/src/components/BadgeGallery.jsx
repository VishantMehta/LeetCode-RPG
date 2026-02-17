import { motion } from 'framer-motion';
import { Shield, Star, Crown, Zap, Flame } from 'lucide-react';

const BadgeGallery = ({ unlockedBadges = [] }) => {
  const BADGES = [
    { id: 1, name: "Novice Solver", icon: Star, reqLevel: 5, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/30" },
    { id: 2, name: "Code Warrior", icon: Shield, reqLevel: 10, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-500/30" },
    { id: 3, name: "Flame Striker", icon: Flame, reqLevel: 15, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-500/30" },
    { id: 4, name: "Algorithm Mage", icon: Zap, reqLevel: 25, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-500/30" },
    { id: 5, name: "Crown of Logic", icon: Crown, reqLevel: 50, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-500/30" },
  ];

  return (
    <div className="mt-10 w-full">
      <h3 className="text-xl font-bold text-gray-300 mb-4 border-b border-gray-700 pb-2">
        Inventory & Achievements
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {BADGES.map((badge, index) => {
          const isUnlocked = unlockedBadges.includes(badge.name);

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
              className={`
                relative p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300
                ${isUnlocked ? `${badge.bg} ${badge.border} shadow-[0_0_15px_rgba(255,255,255,0.05)]` : 'bg-darkBg border-gray-800 opacity-60 grayscale'}
              `}
            >
              <div className={`mb-3 ${isUnlocked ? badge.color : 'text-gray-600'}`}>
                <badge.icon size={40} strokeWidth={isUnlocked ? 2 : 1.5} />
              </div>
              
              <p className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                {badge.name}
              </p>
              
              <p className="text-xs text-gray-500 mt-1">
                {isUnlocked ? 'Unlocked' : `Unlocks at Lvl ${badge.reqLevel}`}
              </p>

              {isUnlocked && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-current ${badge.color} animate-pulse`}></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGallery;