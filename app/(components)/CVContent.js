"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../cv/Navbar";
import ListCard from "./cards/ListCard";
import PositionCard from "./cards/PositionCard";
import LanguagesCard from "./cards/LanguagesCard";
import ProjectsSection from "./ProjectsSection.js";
import store from "@/store/store";
import {
  addPosition,
  addProject,
  setData as setAppData,
} from "@/store/slices/app";
import EducationCard from "./cards/EducationCard";
import cardStyles from "@/app/(styles)/card.module.scss";
import cvStyles from "@/app/(styles)/CV.module.scss";
import Image from "next/image";
import waves from "@/assets/waves.svg";

export default function CVContent({ initialCV }) {
  const { isEditing } = useSelector((state) => state.app);
  const { cv: storedCV } = useSelector((state) => state.app);

  const [CV, setCV] = useState(initialCV);

  useEffect(() => {
    store.dispatch(setAppData({ cv: CV }));
  }, []);

  useEffect(() => {
    storedCV && setCV(storedCV);
  }, [storedCV]);

  return (
    <>
      <Navbar cv={CV} />
      <Image src={waves} alt="waves" className={cvStyles.waves} />
      <section>
        {CV?.positions?.map((position, index) => {
          return (
            <PositionCard key={position.id} position={position} index={index} />
          );
        })}

        {isEditing ? (
          <button
            className="no-print"
            onClick={() => store.dispatch(addPosition())}
          >
            Add Position +
          </button>
        ) : null}
      </section>
      <ListCard
        title="Tools & Technologies"
        items={CV?.technologies || []}
        propName="technologies"
      />
      <ListCard
        title="Industry knowledge"
        items={CV?.industryKnowledge || []}
        propName="industryKnowledge"
      />

      <section className={cardStyles.langs_and_tech}>
        <LanguagesCard languages={CV?.languages || []} />
        <EducationCard items={CV?.education || []} />
      </section>
      <ProjectsSection projects={CV?.projects || []} />
      {isEditing ? (
        <button
          className="no-print mt-1"
          onClick={() => store.dispatch(addProject())}
        >
          Add Project +
        </button>
      ) : null}
    </>
  );
}
