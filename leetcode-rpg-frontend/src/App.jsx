import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import SyncScreen from './pages/SyncScreen'; 
import DashboardPage from './pages/DashboardPage';
import SkillsPage from './pages/SkillsPage';
import InventoryPage from './pages/InventoryPage';
import ActivityPage from './pages/ActivityPage';

import axios from 'axios';

function App() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const syncProfile = async (username) => {
    if (!username) return alert("Pehle LeetCode username daalo warrior!");
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/users/sync/${username}`);
      setPlayerData(response.data.data);
    } catch (error) {
      console.error("Error syncing:", error);
      alert("Sync fail ho gaya. Kya backend chal raha hai?");
    }
    setLoading(false);
  };

  const logout = () => {
    setPlayerData(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-darkBg text-white p-4 font-sans">
        
        {loading && (
          <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
            <Loader2 className="animate-spin text-accent mb-4" size={64} />
            <p className="text-xl font-bold">Synchronizing with LeetCode Arena...</p>
          </div>
        )}

        {!playerData ? (
          <Routes>
            <Route path="/" element={<SyncScreen syncProfile={syncProfile} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <>
            <Header username={playerData.user.leetcode_username} onLogout={logout} />
            
            <main className="w-full max-w-7xl mx-auto flex-grow flex justify-center items-start">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage data={playerData} />} />

                <Route path="/skills" element={<SkillsPage skills={playerData.rpg_skills} />} />
                <Route path="/inventory" element={<InventoryPage badges={playerData.unlocked_badges} />} />
                <Route path="/activity" element={<ActivityPage activity={playerData.recent_activity} />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
            
          </>
          
        )}
      </div>
    </Router>
  );
}

export default App;