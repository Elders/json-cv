import cardStyles from "@/app/(styles)/card.module.scss";
import CardGroup from "./CardGroup";
import {
  addEducation,
  deleteEducation,
  editEducation,
} from "@/store/slices/app";
import store from "@/store/store";

export default function EducationEditable({ items }) {
  function addHandler() {
    store.dispatch(addEducation());
  }

  function editHandler(index, prop, value) {
    store.dispatch(
      editEducation({
        index,
        prop,
        value,
      })
    );
  }

  function deleteHandler(index) {
    store.dispatch(deleteEducation(index));
  }

  return (
    <div className={cardStyles.card}>
      <h2>Education</h2>

      {items.map((item, index) => {
        return (
          <CardGroup key={index} deleteHandler={() => deleteHandler(index)}>
            <div>
              <div>
                <label htmlFor="education-name">Education name: </label>
                <input
                  type="text"
                  id="education-name"
                  value={item.name}
                  onChange={(e) => editHandler(index, "name", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="education-description">
                  Education description:
                </label>
                <input
                  type="text"
                  id="education-description"
                  value={item.description}
                  onChange={(e) =>
                    editHandler(index, "description", e.target.value)
                  }
                />
              </div>
            </div>
          </CardGroup>
        );
      })}
      <button onClick={addHandler}>Add</button>
    </div>
  );
}
