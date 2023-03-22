import { useSelector } from "react-redux";
import ListEditable from "./ListEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import FlowingList from "../FlowingList";

export default function ListCard({ title, items, propName }) {
  const { isEditing } = useSelector((state) => state.app);

  if (isEditing) {
    return <ListEditable title={title} items={items} propName={propName} />;
  }

  return (
    <div className={`${cardStyles.card} ${cardStyles.list_card}`}>
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>
      <FlowingList items={items} breakingCount={20}>
        {items.map((item, index) => {
          return <span key={item + index}> - {item}</span>;
        })}
      </FlowingList>
    </div>
  );
}
