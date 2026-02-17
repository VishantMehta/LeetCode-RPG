import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword, Loader2 } from 'lucide-react';
import XpBar from './components/XpBar';
import BadgeGallery from './components/BadgeGallery';
import SkillTree from './components/SkillTree';

import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const syncProfile = async () => {
    if (!username) return alert("Pehle LeetCode username daalo warrior!");
    
    setLoading(true);
    try {
      // const response = await axios.get(`http://localhost:5000/api/users/sync/${username}`);
      const response = await axios.get(`http://127.0.0.1:5000/api/users/sync/${username}`);
      setPlayerData(response.data.data);
    } catch (error) {
      console.error("Error syncing:", error);
      alert("Sync fail ho gaya. Kya backend chal raha hai?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkBg text-white p-4">
      
      {!playerData ? (
        <div className="text-center max-w-md w-full">
          <motion.div 
            initial={{ y: -100, rotate: -45, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="flex justify-center mb-6"
          >
            <Sword size={80} className="text-accent drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            CodeQuest
          </motion.h1>
          <p className="text-gray-400 mb-8">Enter the arena. Level up your skills.</p>

          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="LeetCode Username..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 rounded-lg bg-darkCard border border-gray-700 focus:outline-none focus:border-primary text-center text-lg"
            />
            <button 
              onClick={syncProfile}
              disabled={loading}
              className="flex justify-center items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 transition-colors rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Enter Dungeon"}
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-4xl bg-darkCard p-8 rounded-2xl border border-gray-700 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">{playerData.user.leetcode_username}</h2>
              <p className="text-gray-400">Class: Algorithm Warrior</p>
            </div>
            <div className="text-right">
              <h3 className="text-4xl font-black text-accent">Lvl {playerData.user.current_level}</h3>
              <p className="text-sm font-bold text-gray-400">{playerData.user.total_xp} XP</p>
            </div>
          </div>

          <XpBar totalXp={playerData.user.total_xp} currentLevel={playerData.user.current_level}/>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-darkBg p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm">Easy</p>
              <p className="text-2xl font-bold text-green-400">{playerData.leetcode_stats.easySolved}</p>
            </div>
            <div className="bg-darkBg p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm">Medium</p>
              <p className="text-2xl font-bold text-yellow-400">{playerData.leetcode_stats.mediumSolved}</p>
            </div>
            <div className="bg-darkBg p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm">Hard</p>
              <p className="text-2xl font-bold text-red-400">{playerData.leetcode_stats.hardSolved}</p>
            </div>
          </div>

          <SkillTree skills={playerData.rpg_skills} />

          {/* <BadgeGallery currentLevel={playerData.user.current_level} /> */}
          <BadgeGallery unlockedBadges={playerData.unlocked_badges} />
          <button 
            onClick={() => setPlayerData(null)}
            className="mt-8 text-gray-400 hover:text-white underline text-sm"
          >
            Logout / Switch Player
          </button>
        </motion.div>
      )}

    </div>
  );
}

export default App;