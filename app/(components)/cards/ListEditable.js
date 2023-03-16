import { useRef, useState } from "react";
import cardStyles from "@/app/(styles)/card.module.scss";
import MultipleInputs from "../MultipleInputs";

export default function ListEditable({ title, items, holderClass, onSave }) {
  const [currentItems, setCurrentItems] = useState(items);

  function saveHandler() {
    const items = currentItems.filter(Boolean);
    onSave && onSave(items);
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>
      <main className={`${cardStyles.list_items_holder} ${holderClass}`}>
        <MultipleInputs items={items} onChange={setCurrentItems} />

        <button className="bg" onClick={saveHandler}>
          Save
        </button>
      </main>
    </div>
  );
}
