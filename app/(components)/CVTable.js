"use client";
import { motion, AnimatePresence } from "framer-motion";
import store from "@/store/store";
import SingleCV from "./SingleCV";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setData } from "@/store/slices/cvs";

import styles from "@/app/(styles)/CV.module.scss";
import AnimationWrapper from "./AnimationWrapper";
import { SortAsc, SortDesc } from "lucide-react";

import useSort, { ASC } from "@/hooks/useSort";

function CorrectSortIcon({ field, sortedBy, sortedOrder }) {
  if (sortedBy !== field) {
    return <SortDesc size={20} />;
  }

  if (sortedOrder === ASC) {
    return <SortAsc size={20} />;
  }

  return <SortDesc size={20} />;
}

export default function CVTable({ initData }) {
  const storedCVS = useSelector((state) => state.cvs);
  const [renderCV, setRenderCV] = useState(initData);
  const { sortList, sortedItems, sortedBy, sortedOrder } = useSort(renderCV);

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
          <th className="pointer">
            <div onClick={() => sortList("elderNumber", sortedOrder)}>
              Elder number{" "}
              <CorrectSortIcon
                field="elderNumber"
                sortedBy={sortedBy}
                sortedOrder={sortedOrder}
              />
            </div>
          </th>
          <th className="pointer">
            <div onClick={() => sortList("name", sortedOrder)}>
              Name
              <CorrectSortIcon
                field="name"
                sortedBy={sortedBy}
                sortedOrder={sortedOrder}
              />
            </div>
          </th>
          <th>Actions</th>
        </tr>
        {sortedItems?.map((cv) => {
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
