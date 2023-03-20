import cardStyles from "@/app/(styles)/card.module.scss";
import MultipleInputs from "../MultipleInputs";
import store from "@/store/store";
import { updateCv } from "@/store/slices/app";
import { useEffect } from "react";

export default function ListEditable({ title, items, holderClass, propName }) {
  const orderClass = items.length <= 20 ? cardStyles.fixed : cardStyles.flowing;

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
      <main
        className={`${cardStyles.list_items_holder} ${orderClass} ${holderClass}`}
      >
        <MultipleInputs items={items} onChange={updateItems} />
      </main>
    </div>
  );
}
