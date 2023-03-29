"use client";
import styles from "@/app/(styles)/confirm.module.scss";
import SendButton from "./SendButton";

export default function Confirm({ onConfirm, onCancel }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h4>Are you sure?</h4>
        <div className={styles.buttons}>
          <SendButton onClick={onConfirm}>Confirm</SendButton>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
