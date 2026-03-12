import { motion } from 'framer-motion';
import BadgeGallery from '../components/BadgeGallery';

const InventoryPage = ({ badges }) => {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-white">Trophy Room</h2>
      <BadgeGallery unlockedBadges={badges} />
    </motion.div>
  );
};
export default InventoryPage;