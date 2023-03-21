import cardStyles from "@/app/(styles)/card.module.scss";
import store from "@/store/store";
import MultipleInputs from "./MultipleInputs";
import { editProject, deleteProject } from "@/store/slices/app";

export default function ProjectsEditable({ projects }) {
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

  return (
    <section>
      {projects?.map((project) => {
        return (
          <div className={cardStyles.card} key={project.id}>
            <header>
              <label>Name: </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  editHandler("name", e.target.value, project.id)
                }
              />
              <div>
                <h4 className="column-name">ROLE</h4>
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
              <h4>DESCRIPTION:</h4>
              <textarea
                value={project.description}
                onChange={(e) =>
                  editHandler("description", e.target.value, project.id)
                }
              ></textarea>
            </div>
            <div>
              <h4>ENVIRONMENT:</h4>
              <input
                value={project.environment}
                onChange={(e) =>
                  editHandler("environment", e.target.value, project.id)
                }
              />
            </div>

            <div>
              <h4>REFERENCES:</h4>
            </div>

            <MultipleInputs
              items={project.references || []}
              onChange={(references) => {
                editHandler(
                  "references",
                  references.filter(Boolean),
                  project.id
                );
              }}
            />

            <button className="bg" onClick={() => deleteHandler(project.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </section>
  );
}
