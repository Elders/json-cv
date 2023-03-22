"use client";
import { useState } from "react";
import styles from "../(styles)/CV.module.scss";

export default function CreateCV() {
  const [name, setName] = useState("");

  function submitHandler() {
    // setData({ ...data, elderNumber: number });
  }

  return (
    <>
      <label className="mt-1">Name of the CV: </label>
      <div className={styles.create_holder}>
        <input
          type="text"
          placeholder="CV Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={submitHandler}>Create</button>
      </div>
    </>
  );
}
