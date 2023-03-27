"use client";

import store from "@/store/store";
import SingleCV from "./SingleCV";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setData } from "@/store/slices/cvs";
import styles from "@/app/(styles)/CV.module.scss";

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
    <div className={styles.cvs_holder}>
      {renderCV?.map((cv) => (
        <SingleCV key={cv.id} cv={cv} />
      ))}
    </div>
  );
}
