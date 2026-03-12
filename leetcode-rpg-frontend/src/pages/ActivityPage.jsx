import { motion } from 'framer-motion';
import BattleLog from '../components/BattleLog';

const ActivityPage = ({ activity }) => {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-white">Recent Encounters</h2>
      <BattleLog recentActivity={activity} />
    </motion.div>
  );
};
export default ActivityPage;