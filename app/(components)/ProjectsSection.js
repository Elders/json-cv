import { useSelector } from 'react-redux';
import ProjectsEditable from './ProjectsEditable';
import cardStyles from '@/app/(styles)/card.module.scss';
import projectIcon from '@/assets/project-icon.svg';
import Image from 'next/image';
import Link from './Link';
import MarkdownElement from './MarkdownElement';

export default function ProjectsSection({ projects }) {
  const { isEditing, cv: cvData } = useSelector((state) => state.app);
  const appProjects = cvData?.projects || [];

  if (isEditing) {
    return <ProjectsEditable projects={appProjects} />;
  }

  return (
    <div>
      {appProjects.length < 1 ? null : (
        <section className={cardStyles.card}>
          <header className={cardStyles.header}>
            <h2>Open-source projects</h2>
          </header>
          {projects?.map((project) => {
            return (
              <div
                className={`${cardStyles.card} ${cardStyles.project_card} mb-3`}
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
                        const placeholder = project.labels
                          ? project.labels[index]
                          : reference;
                        return (
                          <div className="mt-1" key={index}>
                            <Link link={reference} placeholder={placeholder} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
