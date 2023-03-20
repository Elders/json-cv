import cardStyles from "@/app/(styles)/card.module.scss";
import MultipleInputs from "../MultipleInputs";
import store from "@/store/store";
import { updateCv } from "@/store/slices/app";

export default function ListEditable({ title, items, holderClass, propName }) {
  function updateItems(newItems) {
    store.dispatch(
      updateCv({
        [propName]: newItems.filter(Boolean),
      })
    );
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>
      <main className={`${cardStyles.list_items_holder} ${holderClass}`}>
        <MultipleInputs items={items} onChange={updateItems} />
      </main>
    </div>
  );
}
