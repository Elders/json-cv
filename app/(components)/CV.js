"use client";
import { useState, useContext } from "react";
import { CVContext } from "../ContextProvivder";
import { useSelector } from "react-redux";
import ListCard from "./cards/ListCard";
import PositionCard from "./cards/PositionCard";
import PositionEditable from "./cards/PositionEditable";
import CreateCV from "./CreateCV";

export default function CV() {
  const [isAdding, setIsAdding] = useState(false);
  const data = useSelector((state) => state.cv);

  if (!data) {
    return <CreateCV />;
  }

  return (
    <div>
      <nav>
        <h1>ELDER N/ {data.elderNumber}</h1>
      </nav>

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
    </div>
  );
}
