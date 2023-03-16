import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "@/store/store";
import { setData } from "@/store/slices/cv";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function PositionEditable({ position, onSave }) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position || {});
  const data = useSelector((state) => state.cv);

  useEffect(() => {
    if (!position) {
      setCurrentPosition({ id: crypto.randomUUID() });
      return;
    }

    setIsEdit(true);
  }, [position]);

  function saveHandler() {
    let positions = data.positions || [];

    if (!isEdit) {
      positions.push(currentPosition);
    } else {
      positions = positions.map((position) => {
        return position.id === currentPosition.id ? currentPosition : position;
      });
    }

    axios.post("/api/cv", { positions });
    store.dispatch(setData({ positions }));
    onSave && onSave();
  }

  function deleteHandler() {
    let positions = data.positions.filter(
      (position) => position.id !== currentPosition.id
    );

    axios.post("/api/cv", { positions });
    store.dispatch(setData({ positions }));
  }

  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="name">Position name: </label>
          <input
            type="text"
            placeholder="Position name"
            id="name"
            value={currentPosition.name || ""}
            onChange={(e) =>
              setCurrentPosition({ ...currentPosition, name: e.target.value })
            }
          />
        </div>
      </div>

      <div className={cardStyles.row}>
        <div>
          <label htmlFor="startDate">Start date: </label>
          <input
            type="text"
            id="startDate"
            placeholder="Position start year"
            value={currentPosition.periodStart || ""}
            onChange={(e) =>
              setCurrentPosition({
                ...currentPosition,
                periodStart: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="endDate">End date: </label>
          <input
            type="text"
            placeholder="Position end year"
            id="endDate"
            value={currentPosition.periodEnd || ""}
            onChange={(e) =>
              setCurrentPosition({
                ...currentPosition,
                periodEnd: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="projectName">Project Name: </label>
          <input
            type="text"
            placeholder="Project name"
            value={currentPosition.projectName || ""}
            id="projectName"
            onChange={(e) =>
              setCurrentPosition({
                ...currentPosition,
                projectName: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="companyName">Company Name: </label>
          <input
            type="text"
            placeholder="Company name"
            value={currentPosition.companyName || ""}
            id="companyName"
            onChange={(e) =>
              setCurrentPosition({
                ...currentPosition,
                companyName: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="technologyStack">Technology Stack: </label>
          <textarea
            placeholder="Technology Stack"
            value={currentPosition.technologyStack || ""}
            id="technologyStack"
            onChange={(e) =>
              setCurrentPosition({
                ...currentPosition,
                technologyStack: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            placeholder="Description"
            value={currentPosition.description || ""}
            id="description"
            onChange={(e) =>
              setCurrentPosition({
                ...currentPosition,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>

      <button className="bg" onClick={saveHandler}>
        Save
      </button>
      {isEdit ? <button onClick={deleteHandler}>Delete</button> : null}
    </div>
  );
}
