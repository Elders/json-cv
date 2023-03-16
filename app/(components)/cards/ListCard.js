import { useContext, useState } from "react";
import ListEditable from "./ListEditable";
import cardStyles from "../../card.module.scss";
import { CVContext } from "@/app/ContextProvivder";

export default function ListCard({ title, items }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData } = useContext(CVContext);

  function updateItems(newItems) {
    setData({ ...data, technologies: newItems });
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
