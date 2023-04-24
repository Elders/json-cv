import cardStyles from "@/app/(styles)/card.module.scss";
import CardGroup from "./CardGroup";
import {
  addEducation,
  deleteEducation,
  editEducation,
} from "@/store/slices/app";
import store from "@/store/store";
import EducationExternal from "./EducationExternal";

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
            <EducationExternal handler={editHandler} index={index} item={item}/>
          </CardGroup>
        );
      })}
      <button type="button" className="mt-1" onClick={addHandler}>
        Add
      </button>
    </div>
  );
}
