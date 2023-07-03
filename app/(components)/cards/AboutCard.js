import styles from "app/(styles)/card.module.scss";
import { useSelector } from "react-redux";
import { updateCv } from "@/store/slices/app";
import store from "@/store/store";
import { useState } from "react";

function AboutCard({ info }) {
  const { isEditing } = useSelector((state) => state.app);
  const [inputValue, setInputValue] = useState();

  function editHandler(e) {
    setInputValue(e.target.value);
    store.dispatch(updateCv({ info: e.target.value }));
  }

  if (!info && !isEditing) {
    return null;
  }

  return (
    <div className={styles.card}>
      <h2 className="mb-1">About: </h2>
      {isEditing ? (
        <textarea value={inputValue} onChange={editHandler}></textarea>
      ) : (
        <p>{info}</p>
      )}
    </div>
  );
}

export default AboutCard;
