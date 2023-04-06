import { useRef } from "react";
import cardStyles from "@/app/(styles)/card.module.scss";
import useCustomProperty from "@/hooks/useCustomProperty";
import { deletePositionProject, swapProjects } from "@/store/slices/app";
import store from "@/store/store";
import { ChevronDownIcon, ChevronUpIcon, Trash2 } from "lucide-react";

export default function PositionProject({
  project,
  index,
  length,
  positionID,
  editHandler,
}) {
  const red = useCustomProperty("red");
  const projectsRef = useRef();

  function deleteHandler() {
    store.dispatch(
      deletePositionProject({ positionID, projectID: project.id })
    );
  }

  function moveProject(moveBy) {
    const start = index;
    const end = start + moveBy;

    store.dispatch(swapProjects({ positionID, indexes: [start, end] }));

    if (moveBy < 0) return;

    const height =
      projectsRef.current.nextElementSibling.getBoundingClientRect().height;
    window.scrollBy(0, height - 20);
  }

  return (
    <div className="mb-4" ref={projectsRef}>
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

        <div className="flex">
          <Trash2
            color={red}
            onClick={deleteHandler}
            className="align-center mr-1"
          />

          <div className={cardStyles.reorder_parent}>
            {index ? (
              <ChevronUpIcon
                size={35}
                color="#ccc"
                onClick={() => moveProject(-1)}
              />
            ) : null}

            {index !== length - 1 ? (
              <ChevronDownIcon
                size={35}
                color="#ccc"
                onClick={() => moveProject(1)}
              />
            ) : null}
          </div>
        </div>
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
