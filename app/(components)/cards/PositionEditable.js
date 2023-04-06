import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import store from "@/store/store";
import {
  createPositionProject,
  deletePosition,
  swapPositions,
} from "@/store/slices/app";
import { updatePosition } from "@/store/slices/app";
import findPosition from "@/helpers/findPosition";
import cardStyles from "@/app/(styles)/card.module.scss";
import PositionProject from "../PositionProject";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function PositionEditable({ positionID, index, length }) {
  const appData = useSelector((state) => state.app);
  const indexValue = (index + 1).toString().padStart(2, "0");
  const positionRef = useRef();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chosenPresent, setChosenPresent] = useState(false);

  const currentPosition = findPosition(appData.cv, positionID);

  function addProject() {
    store.dispatch(createPositionProject(positionID));
  }

  function editProject(project, updatedPart) {
    const newProject = { ...project, ...updatedPart };
    const projects = currentPosition.projects.map((currentProject) =>
      currentProject.id === project.id ? newProject : currentProject
    );

    store.dispatch(updatePosition({ positionID, projects }));
  }

  function editPosition(newInfo) {
    store.dispatch(updatePosition({ positionID, ...newInfo }));
  }

  function deleteHandler() {
    store.dispatch(deletePosition(positionID));
  }

  useEffect(() => {
    if (!currentPosition) return;

    let endDate = null;

    const startDate = currentPosition.startDate
      ? new Date(currentPosition.startDate)
      : null;

    console.log(currentPosition.endDate);
    if (currentPosition.endDate === "PRESENT") {
      setChosenPresent(true);
    } else if (currentPosition.endDate) {
      endDate = new Date(currentPosition.endDate);
    }

    setStartDate(startDate);
    setEndDate(endDate);
  }, [currentPosition?.startDate, currentPosition?.endDate]);

  function movePosition(moveBy) {
    const start = index;
    const end = start + moveBy;

    store.dispatch(swapPositions([start, end]));

    if (moveBy < 0) return;

    const height = positionRef.current.getBoundingClientRect().height;
    window.scrollBy(0, height - 20);
  }

  useEffect(() => {
    const newValue = chosenPresent ? "PRESENT" : endDate?.toString();
    newValue && editPosition({ endDate: newValue });
  }, [chosenPresent]);

  return (
    <div className={`${cardStyles.card}`} ref={positionRef}>
      <header className={cardStyles.header}>
        <div>
          <div className={cardStyles.grid_content}>
            <div>
              <h3 className="column-name mb-1">START DATE *</h3>

              <ReactDatePicker
                selected={startDate}
                placeholderText="DD/MM/YYYY"
                onChange={(date) => {
                  editPosition({ startDate: date?.toString() || null });
                }}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
                form="cv-form"
                isClearable={true}
                required={true}
              />
            </div>
            <div>
              <h3 className="column-name mb-1">END DATE *</h3>
              <ReactDatePicker
                selected={endDate}
                placeholderText="DD/MM/YYYY"
                onChange={(date) => {
                  editPosition({ endDate: date?.toString() || null });
                }}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
                isClearable={!chosenPresent}
                disabled={chosenPresent}
                required={true}
              />
              <div className="checkbox-wrapper my-1">
                <input
                  type="checkbox"
                  id="present"
                  checked={chosenPresent}
                  onChange={() => setChosenPresent(!chosenPresent)}
                />{" "}
                <label htmlFor="present">Choose Present</label>
              </div>
            </div>
          </div>

          <div className={`${cardStyles.grid_content} my-1`}>
            <div>
              <h4 className="column-name mb-1">COMPANY NAME</h4>
              <input
                type="text"
                placeholder="Company name"
                value={currentPosition?.companyName || ""}
                id="companyName"
                onChange={(e) => editPosition({ companyName: e.target.value })}
              />{" "}
            </div>
            <div>
              <h4 className="column-name mb-1">POSITION NAME</h4>
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
        </div>
        <div>
          <span className={cardStyles.index}>{indexValue}</span>

          <div className={cardStyles.reorder_parent}>
            {index ? (
              <ChevronUpIcon
                size={35}
                color="#ccc"
                onClick={() => movePosition(-1)}
              />
            ) : null}

            {index !== length - 1 ? (
              <ChevronDownIcon
                size={35}
                color="#ccc"
                onClick={() => movePosition(1)}
              />
            ) : null}
          </div>
        </div>
      </header>
      <main>
        {currentPosition?.projects?.map((project) => (
          <PositionProject
            key={project.id}
            project={project}
            positionID={currentPosition.id}
            editHandler={(updatedPart) => editProject(project, updatedPart)}
          />
        ))}

        <button onClick={addProject} type="button">
          Add Project +
        </button>

        <button onClick={deleteHandler} className="mt-1" type="button">
          Delete Position
        </button>
      </main>
    </div>
  );
}
