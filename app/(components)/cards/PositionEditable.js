import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "@/store/store";
import { deletePosition } from "@/store/slices/app";
import {
  setData as setAppData,
  updatePosition,
  createPosition,
} from "@/store/slices/app";
import findPosition from "@/helpers/findPosition";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function PositionEditable({ positionID, isAdding = false }) {
  const [isEdit, setIsEdit] = useState(false);
  const appData = useSelector((state) => state.app);

  const currentPosition = findPosition(appData.cv, positionID);
  const data = useSelector((state) => state.cv);

  const { cv: currentData } = useSelector((state) => state.app);

  function editPosition(newInfo) {
    store.dispatch(updatePosition({ positionID, ...newInfo }));
  }

  function deleteHandler() {
    // let positions = data.positions.filter(
    //   (position) => position.id !== currentPosition.id
    // );

    // axios.post("/api/cv", { positions });
    store.dispatch(deletePosition(positionID));
  }

  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="name">Position name: </label>
          <input
            type="text"
            placeholder="Position name"
            name="positionName"
            id="name"
            value={currentPosition?.name || ""}
            onChange={(e) => editPosition({ name: e.target.value })}
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
            value={currentPosition?.periodStart || ""}
            onChange={(e) => editPosition({ periodStart: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="endDate">End date: </label>
          <input
            type="text"
            placeholder="Position end year"
            id="endDate"
            value={currentPosition?.periodEnd || ""}
            onChange={(e) => editPosition({ periodEnd: e.target.value })}
          />
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="projectName">Project Name: </label>
          <input
            type="text"
            placeholder="Project name"
            value={currentPosition?.projectName || ""}
            id="projectName"
            onChange={(e) => editPosition({ projectName: e.target.value })}
          />
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="companyName">Company Name: </label>
          <input
            type="text"
            placeholder="Company name"
            value={currentPosition?.companyName || ""}
            id="companyName"
            onChange={(e) => editPosition({ companyName: e.target.value })}
          />
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="technologyStack">Technology Stack: </label>
          <textarea
            placeholder="Technology Stack"
            value={currentPosition?.technologyStack || ""}
            id="technologyStack"
            onChange={(e) => editPosition({ technologyStack: e.target.value })}
          ></textarea>
        </div>
      </div>
      <div className={cardStyles.row}>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            placeholder="Description"
            value={currentPosition?.description || ""}
            id="description"
            onChange={(e) => editPosition({ description: e.target.value })}
          ></textarea>
        </div>
      </div>

      {!isAdding ? <button onClick={deleteHandler}>Delete</button> : null}
    </div>
  );
}
