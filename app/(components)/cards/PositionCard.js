import { useSelector } from "react-redux";
import cardStyles from "@/app/(styles)/card.module.scss";
import PositionEditable from "./PositionEditable";

export default function PositionCard({ position, index, ...rest }) {
  const { isEditing } = useSelector((state) => state.app);
  const indexValue = (index + 1).toString().padStart(2, "0");

  if (isEditing) {
    return <PositionEditable positionID={position.id} index={index} />;
  }

  return (
    <div className={`${cardStyles.card}`} {...rest}>
      <header className={cardStyles.header}>
        <div className={cardStyles.grid_content}>
          <div>
            <h4 className="column-name">COMPANY NAME</h4>
            <h2 className={cardStyles.heading}>{position.companyName}</h2>
          </div>
          <div>
            <h3 className="column-name">
              POSITION / ({position.periodStart} - {position.periodEnd})
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
            <div key={project.id}>
              <div className={cardStyles.position_names_info}>
                <div>
                  <h4 className="column-name mb-05">PROJECT NAME</h4>
                  <h3>{project.projectName}</h3>
                </div>
              </div>
              {project.technologyStack ? (
                <div className={"my-3"}>
                  <h2>Technology Stack: </h2>
                  <p>{project.technologyStack}</p>
                </div>
              ) : null}
              {project.description ? (
                <div className={cardStyles.project_description}>
                  <h2>Description: </h2>
                  <p className={cardStyles.paragraph}>{project.description}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </main>
    </div>
  );
}
