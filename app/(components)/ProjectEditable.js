import { useRef } from "react";
import cardStyles from "@/app/(styles)/card.module.scss";
import store from "@/store/store";
import MultipleInputs from "./MultipleInputs";
import {
  editProject,
  deleteProject,
  swapOpenSourceProjects,
} from "@/store/slices/app";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import MarkdownElement from "./MarkdownElement";
import reduceObjField from "@/helpers/reduceObjField";
import parseReferences from "@/helpers/parseReferences.mjs";

export default function ProjectEditable({ project, index, length }) {
  const ref = useRef();
  const referencesLabels = reduceObjField(project.references, "label");
  const referencesLinks = reduceObjField(project.references, "link");

  function editHandler(prop, value, id) {
    store.dispatch(
      editProject({
        id,
        prop,
        value,
      })
    );
  }

  function deleteHandler(id) {
    store.dispatch(deleteProject(id));
  }

  function moveProject(start, moveBy) {
    const end = start + moveBy;

    store.dispatch(swapOpenSourceProjects([start, end]));
    const { height, top, bottom, y } = ref.current.getBoundingClientRect();

    if (moveBy < 0) {
      const bottomScroll = Math.max(
        bottom - document.documentElement.clientHeight,
        0
      );

      return window.scrollBy(0, bottomScroll - height);
    }

    const scrollValue = height + top - 60;
    window.scrollBy(0, scrollValue * moveBy);
  }

  return (
    <div
      className={`${cardStyles.card} ${cardStyles.project_card} mb-3 flex`}
      key={project.id}
      ref={ref}
    >
      <main className="grow">
        {" "}
        <header>
          <h4 className="my-1">Project name: </h4>
          <input
            className={cardStyles.project_name_input}
            type="text"
            value={project.name}
            required
            onChange={(e) => editHandler("name", e.target.value, project.id)}
          />
          <div>
            <h4 className="my-1">Role:</h4>
            <input
              className={cardStyles.project_name_input}
              type="text"
              value={project.role}
              onChange={(e) => editHandler("role", e.target.value, project.id)}
            ></input>
          </div>
        </header>
        <div>
          <MarkdownElement
            sectionHeading={<h4 className="my-1">Description:</h4>}
            canEdit={true}
            markdownContent={project.description}
          >
            <textarea
              value={project.description}
              onChange={(e) =>
                editHandler("description", e.target.value, project.id)
              }
            ></textarea>{" "}
            <p className="hints align-right">Supports Markdown</p>
          </MarkdownElement>
        </div>
        <div>
          <h4 className="my-1">Environment:</h4>
          <input
            className={cardStyles.project_name_input}
            value={project.environment}
            onChange={(e) =>
              editHandler("environment", e.target.value, project.id)
            }
          />
        </div>
        <div>
          <h4 className="my-1">References:</h4>
        </div>
        <MultipleInputs
          defaultLabels={referencesLabels}
          items={referencesLinks || []}
          showLabel={true}
          mainLabelText="URL: "
          className={cardStyles.references}
          onChange={(references, labels) => {
            editHandler(
              "references",
              parseReferences(references, labels),
              project.id
            );
          }}
        />
        <div className="mt-1">
          <button onClick={() => deleteHandler(project.id)}>Delete</button>
        </div>
      </main>{" "}
      <div className={cardStyles.reorder_parent}>
        {index ? (
          <ChevronUpIcon
            size={35}
            color="#ccc"
            onClick={() => moveProject(index, -1)}
          />
        ) : null}

        {index !== length - 1 ? (
          <ChevronDownIcon
            size={35}
            color="#ccc"
            onClick={() => moveProject(index, 1)}
          />
        ) : null}
      </div>
    </div>
  );
}
