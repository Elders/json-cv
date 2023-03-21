"use client";
import { useState, useContext } from "react";
import styles from "../(styles)/CV.module.scss";

export default function CreateCV() {
  const [number, setNumber] = useState(1);
  const { data, setData } = useContext(CVContext);

  function submitHandler() {
    // setData({ ...data, elderNumber: number });
  }

  return (
    <div>
      <div className={styles.no_cv_buttons}>
        <button>New +</button>
        <button>Import</button>
      </div>
      <form className={styles.create_holder} onSubmit={submitHandler}>
        <input
          type="number"
          min="1"
          placeholder="Elder №"
          value={number}
          onChange={(e) => setNumber(+e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
}
