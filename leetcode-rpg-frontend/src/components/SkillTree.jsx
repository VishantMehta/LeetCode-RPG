import { motion } from 'framer-motion';
import { Sword, Wand2, BookOpen, Footprints } from 'lucide-react';

const SkillTree = ({ skills }) => {
  if (!skills) return null;

  const skillConfig = [
    { 
      key: 'ARRAY_STRENGTH', 
      name: 'Strength (Arrays/Strings)', 
      icon: Sword, 
      color: 'bg-red-500', 
      textColor: 'text-red-400' 
    },
    { 
      key: 'GRAPH_MAGIC', 
      name: 'Magic (Trees/Graphs)', 
      icon: Wand2, 
      color: 'bg-purple-500', 
      textColor: 'text-purple-400' 
    },
    { 
      key: 'DP_INTELLIGENCE', 
      name: 'Intelligence (DP/Math)', 
      icon: BookOpen, 
      color: 'bg-blue-500', 
      textColor: 'text-blue-400' 
    },
    { 
      key: 'AGILITY_ROGUE', 
      name: 'Agility (Two Pointers/Greedy)', 
      icon: Footprints, 
      color: 'bg-green-500', 
      textColor: 'text-green-400' 
    }
  ];

  return (
    <div className="bg-darkBg p-6 rounded-xl border border-gray-700 shadow-inner mt-6">
      <h3 className="text-xl font-bold text-gray-300 mb-6 border-b border-gray-700 pb-2">
        Class Skills (Attributes)
      </h3>

      <div className="space-y-6">
        {skillConfig.map((config, index) => {
          const totalSkillXp = skills[config.key] || 0;
          
          const currentLevel = Math.floor(totalSkillXp / 20) + 1;
          const xpInCurrentLevel = totalSkillXp % 20; 
          const progressPercentage = (xpInCurrentLevel / 20) * 100;

          return (
            <motion.div 
              key={config.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <config.icon size={20} className={config.textColor} />
                  <span className="font-bold text-gray-200">{config.name}</span>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-black ${config.textColor}`}>Lvl {currentLevel}</span>
                  <span className="text-xs text-gray-500 ml-2">({xpInCurrentLevel}/20 XP)</span>
                </div>
              </div>

              <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  className={`h-full ${config.color} relative`}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12"></div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillTree;