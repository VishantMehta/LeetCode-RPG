import { motion } from 'framer-motion';
import { Sword, Swords, Wand2, Crown, Sparkles } from 'lucide-react';
import XpBar from '../components/XpBar';

const DashboardPage = ({ data }) => {
  const level = data.user.current_level;

  const getEvolution = (lvl) => {
    if (lvl < 10) return {
      name: "Wooden Sword",
      title: "Novice Scrapper",
      icon: Sword,
      color: "text-amber-600",
      bg: "bg-amber-900/20",
      border: "border-amber-700/50",
      glow: "shadow-[0_0_20px_rgba(217,119,6,0.2)]"
    };
    if (lvl < 25) return {
      name: "Dual Iron Blades",
      title: "Algorithm Knight",
      icon: Swords,
      color: "text-slate-300",
      bg: "bg-slate-700/20",
      border: "border-slate-400/50",
      glow: "shadow-[0_0_30px_rgba(148,163,184,0.4)]"
    };
    if (lvl < 50) return {
      name: "Staff of Logic",
      title: "Code Sorcerer",
      icon: Wand2,
      color: "text-purple-400",
      bg: "bg-purple-900/20",
      border: "border-purple-500/50",
      glow: "shadow-[0_0_40px_rgba(168,85,247,0.5)]"
    };
    return {
      name: "Crown of FAANG",
      title: "LeetCode Lord",
      icon: Crown,
      color: "text-yellow-400",
      bg: "bg-yellow-600/20",
      border: "border-yellow-400/50",
      glow: "shadow-[0_0_50px_rgba(250,204,21,0.6)]"
    };
  };

  const evolution = getEvolution(level);
  const EvolutionIcon = evolution.icon;

  return (
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full bg-darkCard p-8 rounded-2xl border border-gray-700 shadow-2xl">
      
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
            {data.user.leetcode_username}
          </h2>
          <p className={`font-bold tracking-wide mt-1 ${evolution.color}`}>
            {evolution.title}
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-4xl font-black text-accent">Lvl {level}</h3>
          <p className="text-sm font-bold text-gray-400">{data.user.total_xp} XP</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 mb-8 rounded-xl border border-dashed border-gray-700 bg-darkBg/50 relative overflow-hidden">
        <div className={`absolute w-40 h-40 rounded-full blur-3xl opacity-20 ${evolution.bg}`}></div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className={`relative z-10 p-6 rounded-full border-2 ${evolution.bg} ${evolution.border} ${evolution.glow}`}
        >
          <EvolutionIcon size={72} className={evolution.color} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-center z-10"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-bold">Equipped Weapon</p>
          <h3 className={`text-xl font-black tracking-wide flex items-center justify-center gap-2 ${evolution.color}`}>
            <Sparkles size={18} /> {evolution.name} <Sparkles size={18} />
          </h3>
        </motion.div>
      </div>

      <XpBar totalXp={data.user.total_xp} currentLevel={level} />
      
      <div className="grid grid-cols-3 gap-4 text-center mt-8">
        <div className="bg-darkBg p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
          <p className="text-gray-400 text-sm font-bold">Easy</p>
          <p className="text-2xl font-black text-green-400 mt-1">{data.leetcode_stats.easySolved}</p>
        </div>
        <div className="bg-darkBg p-4 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
          <p className="text-gray-400 text-sm font-bold">Medium</p>
          <p className="text-2xl font-black text-yellow-400 mt-1">{data.leetcode_stats.mediumSolved}</p>
        </div>
        <div className="bg-darkBg p-4 rounded-lg border border-gray-700 hover:border-red-500/50 transition-colors">
          <p className="text-gray-400 text-sm font-bold">Hard</p>
          <p className="text-2xl font-black text-red-400 mt-1">{data.leetcode_stats.hardSolved}</p>
        </div>
      </div>

    </motion.div>
  );
};

export default DashboardPage;