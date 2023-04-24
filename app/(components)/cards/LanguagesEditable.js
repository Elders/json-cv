
import cardStyles from "@/app/(styles)/card.module.scss";
import store from "@/store/store";
import {
  addLanguage,
  deleteLanguage,
  updateLanguages,
} from "@/store/slices/app";
import CardGroup from "./CardGroup";
import LanguagesExternal from "./LanguagesExternal";

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
    <div className={`${cardStyles.card}`}>
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
              <LanguagesExternal
                index={index}
                handler={changeHandler}
                language={language}
              />
            </CardGroup>
          );
        })}{" "}
        <button type="button" className="mt-1" onClick={addHandler}>
          Add{" "}
        </button>
      </div>
    </div>
  );
}
