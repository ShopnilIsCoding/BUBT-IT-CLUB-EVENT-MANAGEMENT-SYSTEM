import { motion } from 'framer-motion';
import Banner from "../Components/Banner";
import TandTG from "../Components/TandTG";
import TourType from "../Components/TourType";
import TouristStories from "../Components/TouristStories";
import LeaderboardPreview from '../Components/LeaderboardPreview';
import GamificationHighlights from '../Components/GamificationHighlights';
import Events from '../Components/Dashboard/Events';
import AllStories from '../Components/AllStories';

const Home = () => {
  return (
    <div className="container mx-auto ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Banner />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Events />
      
      
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <LeaderboardPreview />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <GamificationHighlights />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <AllStories />
      </motion.div>
    </div>
  );
};

export default Home;
