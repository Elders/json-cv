import { useSelector } from "react-redux";
import ProjectsEditable from "./ProjectsEditable";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function ProjectsSection() {
  const { projects } = useSelector((state) => state.cv);
  const { isEditing, cv: cvData } = useSelector((state) => state.app);
  const appProjects = cvData.projects;

  if (isEditing) {
    return <ProjectsEditable projects={appProjects} />;
  }

  return (
    <section>
      {projects?.map((project) => {
        return (
          <div className={cardStyles.card} key={project.id}>
            <header>
              <h2>{project.name}</h2>
              <div>
                <h4 className="column-name">ROLE</h4>
                <h5>{project.role}</h5>
              </div>
            </header>
            <main>{project.description}</main>

            {project.environment ? (
              <div>
                <h4>ENVIRONMENT:</h4>
                <p>{project.environment}</p>
              </div>
            ) : null}

            {project.references?.length ? (
              <div>
                <h4>REFERENCES</h4>
                {project.references.map((reference) => {
                  return <a href={reference}>{reference}</a>;
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
