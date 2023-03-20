"use client";

import { useSelector } from "react-redux";
import ListCard from "./cards/ListCard";
import PositionCard from "./cards/PositionCard";
import LanguagesCard from "./cards/LanguagesCard";
import ProjectsSection from "./ProjectsSection.js";
import CreateCV from "./CreateCV";
import store from "@/store/store";
import { addPosition, addProject } from "@/store/slices/app";
import EducationCard from "./cards/EducationCard";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function CVContent() {
  const { isEditing } = useSelector((state) => state.app);

  const data = useSelector((state) => state.cv);
  const appData = useSelector((state) => state.app);

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

        {isEditing ? (
          <button
            className="bg no-print"
            onClick={() => store.dispatch(addPosition())}
          >
            Add Position +
          </button>
        ) : null}
      </section>

      <ListCard
        title="Tools & Technologies"
        items={appData.cv.technologies || []}
        propName="technologies"
      />

      <ListCard
        title="Industry knowledge"
        items={data.industryKnowledge || []}
        propName="industryKnowledge"
      />

      <section className={cardStyles.langs_and_tech}>
        <LanguagesCard languages={appData.cv.languages || []} />
        <EducationCard items={appData.cv.education || []} />
      </section>

      <ProjectsSection />

      {isEditing ? (
        <button
          className="bg no-print"
          onClick={() => store.dispatch(addProject())}
        >
          Add Project +
        </button>
      ) : null}
    </>
  );
}
