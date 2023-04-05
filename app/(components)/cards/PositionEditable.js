import { useSelector } from "react-redux";
import store from "@/store/store";
import { createPositionProject, deletePosition } from "@/store/slices/app";
import { updatePosition } from "@/store/slices/app";
import findPosition from "@/helpers/findPosition";
import cardStyles from "@/app/(styles)/card.module.scss";
import PositionProject from "../PositionProject";

export default function PositionEditable({ positionID, index }) {
  const appData = useSelector((state) => state.app);
  const indexValue = (index + 1).toString().padStart(2, "0");

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

  return (
    <div className={`${cardStyles.card}`}>
      <header className={cardStyles.header}>
        <div>
          <div className={cardStyles.grid_content}>
            <div>
              <h3 className="column-name mb-1">START DATE</h3>
              <input
                type="text"
                id="startDate"
                placeholder="Position start year"
                value={currentPosition?.periodStart || ""}
                onChange={(e) => editPosition({ periodStart: e.target.value })}
              />
            </div>
            <div>
              <h3 className="column-name mb-1">END DATE</h3>
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
          </div>
        </div>
        <span className={cardStyles.index}>{indexValue}</span>
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

        <button onClick={addProject}>Add Project +</button>

        <button onClick={deleteHandler} className="mt-1">
          Delete Position
        </button>
      </main>
    </div>
  );
}
