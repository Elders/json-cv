import cardStyles from "@/app/(styles)/card.module.scss";
import useCustomProperty from "@/hooks/useCustomProperty";
import { deletePositionProject } from "@/store/slices/app";
import store from "@/store/store";
import { Trash2 } from "lucide-react";

export default function PositionProject({ project, positionID, editHandler }) {
  const red = useCustomProperty("red");

  function deleteHandler() {
    store.dispatch(
      deletePositionProject({ positionID, projectID: project.id })
    );
  }

  return (
    <div className="mb-4">
      <div className="flex align-center justify-between">
        <div>
          <h4 className="column-name mb-1">PROJECT NAME</h4>
          <input
            type="text"
            placeholder="Project name"
            value={project?.projectName || ""}
            id="projectName"
            onChange={(e) => editHandler({ projectName: e.target.value })}
          />
        </div>

        <Trash2 color={red} onClick={deleteHandler} />
      </div>
      <div className={cardStyles.position_technology_stack}>
        <h2 className="my-1">Technology Stack: </h2>
        <textarea
          placeholder="Technology Stack"
          value={project?.technologyStack || ""}
          id="technologyStack"
          onChange={(e) => editHandler({ technologyStack: e.target.value })}
        ></textarea>
      </div>
      <div className={cardStyles.position_description}>
        <h2 className="my-1">Description: </h2>
        <textarea
          placeholder="Description"
          value={project?.description || ""}
          id="description"
          onChange={(e) => editHandler({ description: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
}
