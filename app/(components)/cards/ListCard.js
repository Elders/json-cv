import { useSelector } from "react-redux";
import ListEditable from "./ListEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import ReactStars from "react-stars";

export default function ListCard({ title, items, propName }) {
  const { isEditing, cv } = useSelector((state) => state.app);
  const ratingsPropName = propName + "ratings";
  const ratings = cv ? cv[ratingsPropName] : [];

  if (isEditing) {
    return <ListEditable title={title} items={items} propName={propName} />;
  }

  return (
    <div className={`${cardStyles.card} ${cardStyles.list_card}`}>
      <header className={cardStyles.header}>
        <h2>{title}</h2>
      </header>

      <div className={cardStyles.list_holder}>
        {items.map((item, index) => {
          return (
            <>
              {" "}
              <div key={item + index}>
                <span> - {item}</span>{" "}
                <ReactStars
                  count={5}
                  onChange={(newRating) => updateRating(newRating, index)}
                  size={24}
                  half={false}
                  edit={false}
                  value={ratings[index]}
                  color2={"#e40521"}
                />
              </div>{" "}
            </>
          );
        })}
      </div>
    </div>
  );
}
