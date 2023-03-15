"use client";
import { useState, useContext } from "react";
import { CVContext } from "../ContextProvivder";
import PositionCard from "./cards/PositionCard";
import PositionEditable from "./cards/PositionEditable";
import CreateCV from "./CreateCV";
import styles from "./CV.module.scss";

export default function CV() {
  const { data } = useContext(CVContext);
  const [isAdding, setIsAdding] = useState(false);

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
        <button className="bg" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add +"}
        </button>
      </section>
    </div>
  );
}
