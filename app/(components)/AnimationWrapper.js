"use client";
import { motion } from "framer-motion";

function AnimationWrapper({ children }) {
  const anime = {
    start: { x: -1000, y: 0 },
    end: {
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        staggerChildren: 0.08,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div variants={anime} initial="start" animate="end">
      {children}
    </motion.div>
  );
}

export default AnimationWrapper;
