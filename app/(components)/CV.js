"use client";
import { useContext } from "react";
import { CVContext } from "../ContextProvivder";
import CreateCV from "./CreateCV";
import styles from "./CV.module.scss";

export default function CV() {
  const { data } = useContext(CVContext);

  if (!data) {
    return <CreateCV />;
  }

  return (
    <div>
      <nav>
        <h1>ELDER N/ {data.elderNumber}</h1>
      </nav>
    </div>
  );
}
