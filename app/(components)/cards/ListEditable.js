import cardStyles from "@/app/(styles)/card.module.scss";
import MultipleInputs from "../MultipleInputs";

import store from "@/store/store";
import { updateCv } from "@/store/slices/app";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as dictionary from "@/dictionary";

export default function ListEditable({ title, items, holderClass, propName }) {
  const data = useSelector((state) => state.app).cv;
  const ratingsPropName = propName + "ratings";
  const ratings = data[ratingsPropName] || [];

  function updateItems(newItems) {
    store.dispatch(
      updateCv({
        [propName]: newItems.filter(Boolean),
      })
    );
  }

  function updateRating(newRating, index) {
    const newRatings = [...ratings];
    newRatings[index] = newRating;
    dispatchRatings(newRatings);
  }

  function deleteRating() {
    const newRatings = [...ratings];
    newRatings.pop();
    dispatchRatings(newRatings);
  }

  function dispatchRatings(newRatings) {
    store.dispatch(
      updateCv({
        [ratingsPropName]: newRatings,
      })
    );
  }

  return (
    <div className={`${cardStyles.card}`}>
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>
      <main className={`${cardStyles.list_items_holder}  ${holderClass}`}>
        <MultipleInputs
          items={items}
          onChange={updateItems}
          ratings={ratings}
          updateRating={updateRating}
          deleteRating={deleteRating}
          dictionary={dictionary[propName]}
        />
      </main>
    </div>
  );
}
