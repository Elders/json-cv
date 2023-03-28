"use client";
import { motion, AnimatePresence } from "framer-motion";
import store from "@/store/store";
import SingleCV from "./SingleCV";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setData } from "@/store/slices/cvs";
import styles from "@/app/(styles)/CV.module.scss";
import AnimationWrapper from "./AnimationWrapper";

export default function CVList({ initData }) {
  const storedCVS = useSelector((state) => state.cvs);
  const [renderCV, setRenderCV] = useState(initData);

  useEffect(() => {
    !storedCVS.length && store.dispatch(setData(initData));
  }, []);

  useEffect(() => {
    storedCVS.length && setRenderCV(storedCVS);
  }, [storedCVS]);

  return (
    <AnimationWrapper>
      <motion.div exit={{x:0, y:1000}} className={styles.cvs_holder}>
        <AnimatePresence>
        {renderCV?.map((cv) => (
          <SingleCV key={cv.id} cv={cv} />
        ))}
        </AnimatePresence>
      </motion.div>
    </AnimationWrapper>
  );
}
