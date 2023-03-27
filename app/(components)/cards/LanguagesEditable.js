import cardStyles from "@/app/(styles)/card.module.scss";
import MultipleInputs from "../MultipleInputs";
import store from "@/store/store";
import {
  addLanguage,
  deleteLanguage,
  updateLanguages,
} from "@/store/slices/app";
import CardGroup from "./CardGroup";

export default function LanguagesEditable({ languages }) {
  function addHandler() {
    store.dispatch(addLanguage());
  }

  function deleteHandler(index) {
    store.dispatch(deleteLanguage(index));
  }

  function changeHandler(props, index) {
    store.dispatch(updateLanguages([props, index]));
  }

  return (
    <div className={`${cardStyles.card} pointer`}>
      <h2>Languages</h2>
      <div>
        {languages.map((language, index) => {
          return (
            <CardGroup
              key={index}
              deleteHandler={() => {
                deleteHandler(index);
              }}
            >
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
                  value={language.note}
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
            </CardGroup>
          );
        })}{" "}
        <button onClick={addHandler}>Add </button>
      </div>
    </div>
  );
}
