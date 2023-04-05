import { useState } from "react";

import { useSelector } from "react-redux";
import store from "@/store/store";
import { deletePosition } from "@/store/slices/app";
import { updatePosition } from "@/store/slices/app";
import findPosition from "@/helpers/findPosition";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function PositionEditable({ positionID, index }) {
  const appData = useSelector((state) => state.app);
  const indexValue = (index + 1).toString().padStart(2, "0");

  const currentPosition = findPosition(appData.cv, positionID);

  function editPosition(newInfo) {
    store.dispatch(updatePosition({ positionID, ...newInfo }));
  }

  function deleteHandler() {
    store.dispatch(deletePosition(positionID));
  }

  return (
    <div className={`${cardStyles.card}`}>
      <header className={cardStyles.header}>
        <div>
          <div className={cardStyles.grid_content}>
            <div>
              <h3 className="column-name">START DATE</h3>
              <input
                type="text"
                id="startDate"
                placeholder="Position start year"
                value={currentPosition?.periodStart || ""}
                onChange={(e) => editPosition({ periodStart: e.target.value })}
              />
            </div>
            <div>
              <h3 className="column-name">END DATE</h3>
              <input
                type="text"
                placeholder="Position end year"
                id="endDate"
                value={currentPosition?.periodEnd || ""}
                onChange={(e) => editPosition({ periodEnd: e.target.value })}
              />
            </div>
          </div>

          <div className={`${cardStyles.grid_content} my-1`}>
            <div>
              <h4 className="column-name">POSITION NAME</h4>
              <input
                type="text"
                placeholder="Position name"
                name="positionName"
                id="name"
                value={currentPosition?.name || ""}
                onChange={(e) => editPosition({ name: e.target.value })}
              />
            </div>

            <div>
              <h4 className="column-name">COMPANY NAME</h4>
              <input
                type="text"
                placeholder="Company name"
                value={currentPosition?.companyName || ""}
                id="projectName"
                onChange={(e) => editPosition({ companyName: e.target.value })}
              />{" "}
            </div>
          </div>
        </div>
        <span className={cardStyles.index}>{indexValue}</span>
      </header>
      <main>
        <div className={cardStyles.position_names_info}>
          <div>
            <h4 className="column-name">PROJECT NAME</h4>
            <input
              type="text"
              placeholder="Project name"
              value={currentPosition?.projectName || ""}
              id="projectName"
              onChange={(e) => editPosition({ projectName: e.target.value })}
            />
          </div>
        </div>
        <div className={cardStyles.position_technology_stack}>
          <h2 className="my-1">Technology Stack: </h2>
          <textarea
            placeholder="Technology Stack"
            value={currentPosition?.technologyStack || ""}
            id="technologyStack"
            onChange={(e) => editPosition({ technologyStack: e.target.value })}
          ></textarea>
        </div>

        <div className={cardStyles.position_description}>
          <h2 className="my-1">Description: </h2>
          <textarea
            placeholder="Description"
            value={currentPosition?.description || ""}
            id="description"
            onChange={(e) => editPosition({ description: e.target.value })}
          ></textarea>
        </div>
        <button onClick={deleteHandler} className="mt-1">
          Delete
        </button>
      </main>
    </div>
  );
}
