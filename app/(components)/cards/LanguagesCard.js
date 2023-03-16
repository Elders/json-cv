import { useState } from "react";
import LanguagesEditable from "./LanguagesEditable";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function LanguagesCard({ languages }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <LanguagesEditable languages={languages} />;
  }

  return (
    <div
      className={`${cardStyles.card} pointer`}
      onClick={() => setIsEditing(true)}
    >
      <h2>Languages</h2>
      <div>
        {languages.map((language) => {
          return (
            <div key={language.name}>
              <h4 className="column-name">{language.name}</h4>
              <div className={cardStyles.language_info}>
                {language.note}{" "}
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
