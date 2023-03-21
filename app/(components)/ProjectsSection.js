import { useSelector } from "react-redux";
import ProjectsEditable from "./ProjectsEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import projectIcon from "@/assets/project-icon.svg";
import Image from "next/image";
import Link from "./Link";

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
        const linkOrderClass =
          project.references.length <= 10
            ? cardStyles.fixed
            : cardStyles.flowing;
        return (
          <div
            className={`${cardStyles.card} ${cardStyles.project_card}`}
            key={project.id}
          >
            <header className={cardStyles.project_header}>
              <div className={cardStyles.project_name}>
                <Image src={projectIcon} alt="project icon" />
                <h2>{project.name}</h2>
              </div>
              <div>
                <h4 className="column-name">ROLE:</h4>
                <h5>{project.role}</h5>
              </div>
            </header>
            <main>
              <p>{project.description}</p>
            </main>

            {project.environment ? (
              <div>
                <h4>ENVIRONMENT:</h4>
                <p>{project.environment}</p>
              </div>
            ) : null}

            {project.references?.length ? (
              <div className={cardStyles.references}>
                <h4>REFERENCES</h4>
                <div
                  className={`${cardStyles.list_items_holder} ${linkOrderClass}`}
                >
                  {project.references.map((reference, index) => {
                    return <Link link={reference} key={index} />;
                  })}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
