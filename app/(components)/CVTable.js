"use client";
import { motion, AnimatePresence } from "framer-motion";
import store from "@/store/store";
import SingleCV from "./SingleCV";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCV, setData } from "@/store/slices/cvs";

import styles from "@/app/(styles)/CV.module.scss";
import AnimationWrapper from "./AnimationWrapper";
import { SortAsc, SortDesc } from "lucide-react";

import useSort, { ASC } from "@/hooks/useSort";
import Confirm from "./Confirm";
import axios from "axios";

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
  const [deleteId, setDeleteId] = useState(null);
  const { sortList, sortedItems, sortedBy, sortedOrder } = useSort(renderCV);

  useEffect(() => {
    storedCVS && setRenderCV(storedCVS);
  }, [storedCVS]);

  async function deleteHandler() {
    setDeleteId(false);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/cv/${deleteId}`);
      store.dispatch(deleteCV(deleteId));
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }

  return (
    <AnimationWrapper>
      {deleteId ? (
        <Confirm onConfirm={deleteHandler} onCancel={() => setDeleteId(null)} />
      ) : null}
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
          <AnimatePresence>
            {sortedItems?.map((cv, index) => {
              return (
                <SingleCV
                  key={cv.id}
                  cv={cv}
                  onDeleteStart={(id) => setDeleteId(id)}
                />
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </AnimationWrapper>
  );
}
