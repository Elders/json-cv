"use client";

import { useState } from "react";

function EducationExternal(props) {
  const [education, setEducation] = useState();
  const [description, setDescription] = useState();

  return (
    <>
      <div>
        <div>
          <label htmlFor="education-name">Institution: </label>
          <input
            type="text"
            id="education-name"
            value={education ? education : props.item.name}
            onChange={(e) => {
              setEducation(e.target.value);
              props.handler(props.index, "name", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="education-description">Degree:</label>
          <input
            type="text"
            id="education-description"
            value={description ? description : props.item.description}
            onChange={(e) => {
              setDescription(e.target.value);
              props.handler(props.index, "description", e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EducationExternal;
