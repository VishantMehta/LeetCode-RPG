import { motion } from 'framer-motion';
import SkillTree from '../components/SkillTree';

const SkillsPage = ({ skills }) => {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-white">Character Skills</h2>
      <SkillTree skills={skills} />
    </motion.div>
  );
};
export default SkillsPage;