"use client";
import { useState } from "react";
import styles from "../(styles)/CV.module.scss";

export default function CreateCV() {
  const [number, setNumber] = useState(1);

  function submitHandler() {
    // setData({ ...data, elderNumber: number });
  }

  return (
    <>
      <div className={styles.no_cv_buttons}>
        <button>New +</button>
        <button>Import</button>
      </div>
      <div className={styles.create_holder}>
        <input
          type="number"
          min="1"
          placeholder="Elder №"
          value={number}
          onChange={(e) => setNumber(+e.target.value)}
        />
        <button onClick={submitHandler}>Create</button>
      </div>
    </>
  );
}
