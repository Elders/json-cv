import { useSelector } from "react-redux";
import ListEditable from "./ListEditable";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function ListCard({ title, items, propName }) {
  const { isEditing } = useSelector((state) => state.app);

  if (isEditing) {
    return <ListEditable title={title} items={items} propName={propName} />;
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
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
