"use client";
import { useContext } from "react";
import { CVContext } from "../ContextProvivder";
import styles from "./CV.module.scss";

export default function CV() {
  const { data } = useContext(CVContext);

  if (!data) {
    return (
      <div className={styles.no_cv_buttons}>
        <button>New +</button>
        <button>Import</button>
      </div>
    );
  }

  return <p>asdadadss</p>;
}
