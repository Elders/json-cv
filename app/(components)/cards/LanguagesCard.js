import { useState } from "react";
import LanguagesEditable from "./LanguagesEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import { useSelector } from "react-redux";

export default function LanguagesCard({ languages }) {
  const { isEditing } = useSelector((state) => state.app);

  if (isEditing) {
    return <LanguagesEditable languages={languages} />;
  }

  return (
    <div className={cardStyles.card}>
      <h2>Languages</h2>
      <div>
        {languages.map((language) => {
          return (
            <div key={language.name}>
              <h4 className={`${cardStyles.language} ${cardStyles.heading}`}>
                {language.name}
              </h4>
              <div className={cardStyles.language_info}>
                <h4>{language.note} </h4>
                <div className={cardStyles.language_tags}>
                  {language.tags?.map((tag) => {
                    return (
                      <div className="tag" key={tag}>
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
