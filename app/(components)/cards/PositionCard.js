import { useSelector } from "react-redux";
import formatDate from "@/helpers/date";
import cardStyles from "@/app/(styles)/card.module.scss";
import PositionEditable from "./PositionEditable";
import Link from "../Link";

export default function PositionCard({ position, index, length, ...rest }) {
  const { isEditing } = useSelector((state) => state.app);
  const indexValue = (index + 1).toString().padStart(2, "0");

  if (isEditing) {
    return (
      <PositionEditable
        positionID={position.id}
        index={index}
        length={length}
      />
    );
  }

  return (
    <div className={`${cardStyles.card} ${cardStyles.position_card}`} {...rest}>
      <header className={cardStyles.header}>
        <div className={cardStyles.grid_content}>
          <div>
            <h4 className="column-name">COMPANY NAME</h4>
            <h2 className={cardStyles.heading}>{position.companyName}</h2>
          </div>
          <div>
            <h3 className="column-name">
              POSITION / ({formatDate(position.startDate)} -{" "}
              {formatDate(position.endDate)})
            </h3>
            <h2 className={`${cardStyles.position_name} ${cardStyles.heading}`}>
              {position.name}
            </h2>
          </div>
        </div>
        <span className={cardStyles.index}>{indexValue}</span>
      </header>
      <main>
        {position.projects?.map((project) => {
          return (
            <div key={project.id} className="my-3 project">
              <div className={`${cardStyles.position_names_info} mb-3`}>
                <div>
                  <div className="empty-div"></div>
                  <h4 className="column-name mb-05">PROJECT NAME</h4>
                  <h3>{project.projectName}</h3>
                </div>
              </div>
              {project.technologyStack ? (
                <div className={"mb-3"}>
                  <h2>Technology Stack: </h2>
                  <p>{project.technologyStack}</p>
                </div>
              ) : null}
              {project.description ? (
                <div className={cardStyles.project_description}>
                  <h2>Description: </h2>
                  <pre className="mt-2">{project.description}</pre>
                </div>
              ) : null}
              {project.references?.length >= 1 ? (
                <div>
                  <h2 className="mt-2">References: </h2>
                </div>
              ) : null}

              {project.references?.map((reference, index) => {
                return (
                  <div key={index} className="mt-2">
                    <Link
                      link={reference}
                      placeholder={project.referencesLabels[index] || reference}
                      key={index}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
}
