import { useState } from "react";
import EducationEditable from "./EducationEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import { useSelector } from "react-redux";

export default function EducationCard({ items }) {
  const { isEditing } = useSelector((state) => state.app);

  if (isEditing) {
    return <EducationEditable items={items} />;
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
      <h2>Education</h2>
      <div>
        {items.map((item) => {
          return (
            <div key={item.name}>
              <h4 className="column-name">{item.name}</h4>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
