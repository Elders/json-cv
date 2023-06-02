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

export default function ProjectsEditable({ projects }) {
  const projectsRef = useRef();

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

    if (moveBy < 0) return;

    const element = projectsRef.current.children[start];

    const height = element.getBoundingClientRect().height;
    window.scrollBy(0, height - 20);
  }

  return (
    <section ref={projectsRef}>
      {projects?.map((project, index, self) => {
        const length = self.length;
        return (
          <div className={`${cardStyles.card} mb-3 flex`} key={project.id}>
            <main className="grow">
              {" "}
              <header>
                <h4 className="my-1">Name: </h4>
                <input
                  type="text"
                  value={project.name}
                  required
                  onChange={(e) =>
                    editHandler("name", e.target.value, project.id)
                  }
                />
                <div>
                  <h4 className="my-1">Role:</h4>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) =>
                      editHandler("role", e.target.value, project.id)
                    }
                  ></input>
                </div>
              </header>
              <div>
                <h4 className="my-1">Description:</h4>
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    editHandler("description", e.target.value, project.id)
                  }
                ></textarea>
              </div>
              <div>
                <h4 className="my-1">Environment:</h4>
                <input
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
                defaultLabels={project.labels}
                items={project.references || []}
                showLabel={true}
                mainLabelText="URL: "
                onChange={(references, labels) => {
                  editHandler(
                    "references",
                    references?.filter(Boolean) || [],
                    project.id
                  );
                  editHandler(
                    "labels",
                    labels?.filter(Boolean) || [],
                    project.id
                  );
                }}
              />
              <div className="mt-1">
                <button onClick={() => deleteHandler(project.id)}>
                  Delete
                </button>
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
      })}
    </section>
  );
}
