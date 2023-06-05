"use client";

import { useState } from "react";
import cardStyles from "@/app/(styles)/card.module.scss";

function EducationExternal(props) {
  const [education, setEducation] = useState();
  const [description, setDescription] = useState();

  return (
    <>
      <div>
        <div className={cardStyles.mt}>
          <label htmlFor="education-name">Institution: </label>
          <input
            className={cardStyles.project_name_input}
            type="text"
            id="education-name"
            value={education ? education : props.item.name}
            onChange={(e) => {
              setEducation(e.target.value);
              props.handler(props.index, "name", e.target.value);
            }}
          />
        </div>
        <div className={cardStyles.mt}>
          <label htmlFor="education-description">Degree:</label>
          <input
            className={cardStyles.project_name_input}
            type="text"
            id="education-description"
            value={description ? description : props.item.description}
            onChange={(e) => {
              setDescription(e.target.value);
              props.handler(props.index, "description", e.target.value);
            }}
          />
          <p className="hints">
            Degree and speciality (e.g. Master of Computer Science, Bachelor of
            Marketing)
          </p>
        </div>
      </div>
    </>
  );
}

export default EducationExternal;
