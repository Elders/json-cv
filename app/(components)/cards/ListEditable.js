import { useRef, useState } from "react";
import cardStyles from "../../card.module.scss";

export default function ListEditable({ title, items, holderClass, onSave }) {
  const [renderItems, setRenderItems] = useState(items);
  const itemsValues = useRef(items);

  function addItem() {
    setRenderItems([...renderItems, ""]);
    itemsValues.current.push("");
  }

  function updateItem(e, index) {
    itemsValues.current[index] = e.target.value;
  }

  function saveHandler() {
    const items = itemsValues.current.filter(Boolean);
    onSave && onSave(items);
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>
      <main className={`${cardStyles.list_items_holder} ${holderClass}`}>
        {renderItems.map((item, index) => {
          return (
            <input
              key={item + index}
              defaultValue={item}
              type="text"
              onChange={(e) => updateItem(e, index)}
            />
          );
        })}

        <button className="bg" onClick={saveHandler}>
          Save
        </button>

        <button className="bg" onClick={addItem}>
          Add New +
        </button>
      </main>
    </div>
  );
}
