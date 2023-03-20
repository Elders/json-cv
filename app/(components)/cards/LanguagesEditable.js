import cardStyles from "@/app/(styles)/card.module.scss";
import MultipleInputs from "../MultipleInputs";
import store from "@/store/store";
import { updateLanguages } from "@/store/slices/app";

export default function LanguagesEditable({ languages }) {
  function changeHandler(props, index) {
    store.dispatch(updateLanguages([props, index]));
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
      <div>
        {languages.map((language, index) => {
          return (
            <div key={index}>
              <div>
                <label htmlFor="language-name">Language: </label>
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) =>
                    changeHandler([["name", e.target.value]], index)
                  }
                  placeholder="Language"
                />
              </div>
              <div>
                <label htmlFor="language-note">Note: </label>
                <input
                  type="text"
                  defaultValue={language.note}
                  placeholder="Note"
                  onChange={(e) => {
                    changeHandler([["note", e.target.value]], index);
                  }}
                />
              </div>

              <MultipleInputs
                items={language.tags || []}
                onChange={(newTags) => {
                  const filteredTags = newTags.filter(Boolean);
                  changeHandler([["tags", filteredTags]], index);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
