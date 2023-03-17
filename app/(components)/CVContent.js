"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import ListCard from "./cards/ListCard";
import PositionCard from "./cards/PositionCard";
import LanguagesCard from "./cards/LanguagesCard";
import PositionEditable from "./cards/PositionEditable";

export default function CVContent() {
  const [isAdding, setIsAdding] = useState(false);
  const data = useSelector((state) => state.cv);

  if (!data) {
    return <CreateCV />;
  }

  return (
    <>
      <section>
        {data.positions?.map((position, index) => {
          return (
            <PositionCard key={position.id} position={position} index={index} />
          );
        })}
        {isAdding ? (
          <PositionEditable onSave={() => setIsAdding(false)} />
        ) : null}
        <button className="bg no-print" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add Position +"}
        </button>
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
        <LanguagesCard languages={data.languages || []} />
      </div>
    </>
  );
}
