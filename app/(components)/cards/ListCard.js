import { useSelector } from "react-redux";
import ListEditable from "./ListEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import Rating from "react-rating";
import RatingPlaceholder from "../RatingPlaceholder";

export default function ListCard({ title, items, propName, hint }) {
  const { isEditing, showRatings, cv } = useSelector((state) => state.app);

  const ratingsPropName = propName + "ratings";
  const ratings = cv ? cv[ratingsPropName] || [] : [];

  if (isEditing) {
    return (
      <ListEditable
        hint={hint}
        title={title}
        items={items}
        propName={propName}
      />
    );
  }

  return (
    <div className={`${cardStyles.card} ${cardStyles.list_card}`}>
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>

      <div className={cardStyles.list_holder}>
        {items.map((item, index) => {
          return (
            <div key={item + index}>
              <span> - {item}</span>{" "}
              {showRatings ? (
                <div className="mt-1">
                  <Rating
                    readonly={true}
                    initialRating={ratings[index]}
                    emptySymbol={<RatingPlaceholder />}
                    fullSymbol={<RatingPlaceholder isFilled={true} />}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
