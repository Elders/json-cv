import { useState } from "react";
import cardStyles from "@/app/(styles)/card.module.scss";
import MultipleInputs from "../MultipleInputs";
import store from "@/store/store";
import { setData } from "@/store/slices/cv";
import axios from "axios";

export default function LanguagesEditable({ languages, onSave }) {
  const [renderItems, setRenderItems] = useState([...languages]);

  function updateLanguages(props, index) {
    const newLanguages = [...renderItems];
    const language = { ...newLanguages[index] };

    props.forEach((pair) => {
      language[pair[0]] = pair[1];
    });

    newLanguages[index] = language;
    setRenderItems(newLanguages);
  }

  function saveHandler() {
    console.log(renderItems);
    store.dispatch(setData({ languages: renderItems }));
    axios.post("/api/cv", { languages: renderItems });
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
      <div>
        {renderItems.map((language, index) => {
          return (
            <div key={index}>
              <div>
                <label htmlFor="language-name">Language: </label>
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) =>
                    updateLanguages([["name", e.target.value]], index)
                  }
                  placeholder="Language"
                />
              </div>
              <div>
                <label htmlFor="language-note">Note: </label>
                <input
                  type="text"
                  defaultValue={language.Note}
                  placeholder="Note"
                />
              </div>

              <MultipleInputs
                items={language.tags || []}
                onChange={(newTags) => {
                  updateLanguages([["tags", newTags]], index);
                }}
              />
            </div>
          );
        })}

        <button className="bg" onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
}
