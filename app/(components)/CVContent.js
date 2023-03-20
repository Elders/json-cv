"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ListCard from "./cards/ListCard";
import PositionCard from "./cards/PositionCard";
import LanguagesCard from "./cards/LanguagesCard";
import CreateCV from "./CreateCV";
import PositionEditable from "./cards/PositionEditable";
import store from "@/store/store";
import { createPosition } from "@/store/slices/app";
import EducationCard from "./cards/EducationCard";

export default function CVContent() {
  const { isEditing } = useSelector((state) => state.app);
  const [isAdding, setIsAdding] = useState(false);
  const data = useSelector((state) => state.cv);
  const appData = useSelector((state) => state.app);
  const newPosition = appData.cv?.positions[appData.cv.positions.length - 1];

  // useEffect(() => {
  //   if (isAdding) {
  //     store.dispatch(createPosition());
  //   }
  // }, [isAdding]);

  if (!data) {
    return <CreateCV />;
  }

  return (
    <>
      <section>
        {appData.cv.positions?.map((position, index) => {
          return (
            <PositionCard key={position.id} position={position} index={index} />
          );
        })}
        {/* {isEditing && isAdding ? (
          <PositionEditable
            onSave={() => setIsAdding(false)}
            positionID={newPosition.id}
            isAdding={true}
          />
        ) : null} */}

        {isEditing ? (
          <button
            className="bg no-print"
            onClick={() => store.dispatch(createPosition())}
          >
            {/* {isAdding ? "Cancel" : "Add Position +"} */}
            Add Position +
          </button>
        ) : null}
      </section>

      <ListCard
        title="Tools & Technologies"
        items={data.technologies || []}
        propName="technologies"
      />

      <ListCard
        title="Industry knowledge"
        items={data.industryKnowledge || []}
        propName="industryKnowledge"
      />

      <div>
        <LanguagesCard languages={appData.cv.languages || []} />
        <EducationCard items={appData.cv.education || []} />
      </div>
    </>
  );
}
