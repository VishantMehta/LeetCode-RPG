import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

const BattleLog = ({ recentActivity }) => {
    // console.log("Battle Log Data:", recentActivity);
  if (!recentActivity || recentActivity.length === 0) return null;
    
  return (
    <div className="bg-darkBg p-6 rounded-xl border border-gray-700 shadow-inner mt-6">
      <h3 className="text-xl font-bold text-gray-300 mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
        <Swords size={20} className="text-red-400" />
        Battle Log (Recent Kills)
      </h3>

      <div className="space-y-3">
        {recentActivity.map((log, index) => {
          const date = new Date(log.timestamp * 1000);
          const timeAgo = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center p-3 bg-darkCard rounded-lg border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-200 text-sm">
                  Defeated "{log.title}"
                </span>
                <span className="text-xs text-gray-500">{timeAgo}</span>
              </div>
              <div className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                + XP Gained
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BattleLog;