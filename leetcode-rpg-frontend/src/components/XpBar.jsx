import { motion } from 'framer-motion';

const XpBar = ({ totalXp, currentLevel }) => {
  
  const xpForCurrentLevel = Math.pow(currentLevel - 1, 2) * 50;
  const xpForNextLevel = Math.pow(currentLevel, 2) * 50;
  
  const xpGainedThisLevel = totalXp - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  
  const progressPercentage = Math.min((xpGainedThisLevel / xpNeededForNextLevel) * 100, 100);

  return (
    <div className="w-full mt-6 mb-8">
      <div className="flex justify-between text-sm text-gray-400 mb-2 font-bold">
        <span>Level {currentLevel}</span>
        <span>{Math.floor(progressPercentage)}% to Level {currentLevel + 1}</span>
      </div>
      
      <div className="h-6 w-full bg-darkBg rounded-full overflow-hidden border border-gray-700 shadow-inner">
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="h-full bg-gradient-to-r from-primary to-accent relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12"></div>
        </motion.div>
        
      </div>
      
      <div className="text-right text-xs text-gray-500 mt-2">
        {totalXp} / {xpForNextLevel} Total XP
      </div>
    </div>
  );
};

export default XpBar;