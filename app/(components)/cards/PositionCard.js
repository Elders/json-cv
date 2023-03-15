import { useState } from "react";
import cardStyles from "../../card.module.scss";
import PositionEditable from "./PositionEditable";

export default function PositionCard({ position, index, ...rest }) {
  const [isEditing, setIsEditing] = useState(false);
  const indexValue = (index + 1).toString().padStart(2, "0");

  if (isEditing) {
    return (
      <PositionEditable
        position={position}
        onSave={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div
      className={`${cardStyles.card} pointer`}
      onClick={() => setIsEditing(true)}
      {...rest}
    >
      <header className={cardStyles.header}>
        <div>
          <h3 className="column-name">
            POSITION / ({position.periodStart} - {position.periodEnd})
          </h3>
          <h2 className={cardStyles.position_name}>{position.name}</h2>
        </div>
        <span className={cardStyles.index}>{indexValue}</span>
      </header>
      <main>
        <div className={cardStyles.position_names_info}>
          <div>
            <h4 className="column-name">PROJECT NAME</h4>
            <h3>{position.projectName}</h3>
          </div>
          <div>
            <h4 className="column-name">COMPANY NAME</h4>
            <h3>{position.companyName}</h3>
          </div>
          {position.technologyStack ? (
            <div className={cardStyles.position_description}>
              <h3>Technology Stack: </h3>
              <p>{position.technologyStack}</p>
            </div>
          ) : null}
          {position.description ? (
            <div className={cardStyles.position_description}>
              <h3>Description: </h3>
              <p>{position.description}</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
