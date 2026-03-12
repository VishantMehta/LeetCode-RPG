import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword } from 'lucide-react';

const SyncScreen = ({ syncProfile }) => {
  const [username, setUsername] = useState('');

  return (
    <div className="text-center max-w-md w-full mt-20">
      <motion.div initial={{ y: -100, rotate: -45, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className="flex justify-center mb-6">
        <Sword size={80} className="text-accent drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
      </motion.div>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        CodeQuest
      </motion.h1>
      <p className="text-gray-400 mb-8">Enter the arena. Level up your skills.</p>
      <div className="flex flex-col gap-4">
        <input type="text" placeholder="LeetCode Username..." value={username} onChange={(e) => setUsername(e.target.value)} className="px-4 py-3 rounded-lg bg-darkCard border border-gray-700 focus:outline-none focus:border-primary text-center text-lg text-white" />
        <button onClick={() => syncProfile(username)} className="flex justify-center items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 transition-colors rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)]">
          Enter Dungeon
        </button>
      </div>
    </div>
  );
};
export default SyncScreen;