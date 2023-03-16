import { useState } from "react";
import { useSelector } from "react-redux";
import { setData } from "@/store/slices/cv";
import store from "@/store/store";
import ListEditable from "./ListEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import axios from "axios";

export default function ListCard({ title, items, propName }) {
  const [isEditing, setIsEditing] = useState(false);

  function updateItems(newItems) {
    const updatedData = { [propName]: newItems };
    store.dispatch(setData(updatedData));
    axios.post("/api/cv", updatedData);
    setIsEditing(false);
  }

  if (isEditing) {
    return <ListEditable title={title} items={items} onSave={updateItems} />;
  }

  return (
    <div
      className={`${cardStyles.card} pointer`}
      onClick={() => setIsEditing(true)}
    >
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>
      <main>
        {items.map((item, index) => {
          return <span key={item + index}>{item}</span>;
        })}
      </main>
    </div>
  );
}
