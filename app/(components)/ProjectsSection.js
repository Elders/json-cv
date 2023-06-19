import { useSelector } from "react-redux";
import ProjectEditable from "./ProjectEditable";
import cardStyles from "@/app/(styles)/card.module.scss";
import projectIcon from "@/assets/project-icon.svg";
import Image from "next/image";
import Link from "./Link";
import MarkdownElement from "./MarkdownElement";

function ProjectCard({ project }) {
  return (
    <div key={project.id}>
      <div className="empty-div"></div>
      <div
        className={`${cardStyles.card} ${cardStyles.project_card}`}
        key={project.id}
      >
        <header className={cardStyles.project_header}>
          <div className={cardStyles.project_name}>
            <Image
              src={projectIcon}
              className={cardStyles.project_icon}
              alt="project icon"
            />
            <h2>{project.name}</h2>
          </div>
          {!project.role ? null : (
            <div>
              <h4 className="column-name">ROLE:</h4>
              <h5>{project.role}</h5>
            </div>
          )}
        </header>
        <main>
          <MarkdownElement markdownContent={project.description} />
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
            <div>
              {project.references.map((reference, index) => {
                console.log("project.references: ", project.references);
                const placeholder = reference.label || reference.link;

                return (
                  <div className="mt-1" key={index}>
                    <Link link={reference.link} placeholder={placeholder} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }) {
  const { isEditing, cv: cvData } = useSelector((state) => state.app);
  const appProjects = cvData?.projects || [];

  return (
    <div>
      {appProjects.length < 1 ? null : (
        <section className={cardStyles.card}>
          <header className={cardStyles.header}>
            <h2>Open-source projects</h2>
          </header>
          {projects?.map((project, index) => {
            return isEditing ? (
              <ProjectEditable
                project={project}
                index={index}
                length={projects.length}
              />
            ) : (
              <ProjectCard project={project} />
            );
          })}
        </section>
      )}
    </div>
  );
}
