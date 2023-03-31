"use client";
import { motion, AnimatePresence } from "framer-motion";
import store from "@/store/store";
import SingleCV from "./SingleCV";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setData } from "@/store/slices/cvs";

import styles from "@/app/(styles)/CV.module.scss";
import AnimationWrapper from "./AnimationWrapper";

export default function CVTable({ initData }) {
  const storedCVS = useSelector((state) => state.cvs);
  const [renderCV, setRenderCV] = useState(initData);

  useEffect(() => {
    !storedCVS && store.dispatch(setData(initData));
  }, []);

  useEffect(() => {
    storedCVS && setRenderCV(storedCVS);
  }, [storedCVS]);

  return (
    <table className={styles.cvs_holder}>
      <tbody>
        <tr>
          <th>Image</th>
          <th>Elder number</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        {renderCV?.map((cv) => {
          return <SingleCV key={cv.id} cv={cv} />;
        })}
      </tbody>
    </table>
  );

  // return (
  //   <AnimationWrapper>
  //     <motion.div className={styles.cvs_holder}>
  //       <table>
  //         <AnimatePresence>
  //           {renderCV?.map((cv) => (
  //             <SingleCV key={cv.id} cv={cv} />
  //           ))}
  //         </AnimatePresence>
  //       </table>
  //     </motion.div>
  //   </AnimationWrapper>
  // );
}
