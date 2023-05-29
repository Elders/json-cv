"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addCV } from "@/store/slices/cvs";
import SendButton from "./SendButton";
import styles from "../(styles)/CV.module.scss";
import store from "@/store/store";

const ENTER_KEYCODE = 13;

export default function CreateCV() {
  const [name, setName] = useState("");
  const [elderNumber, setElderNumber] = useState("");
  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    const { data } = await axios.post("/api/createCV", { name, elderNumber });
    if (data.isSuccess) {
      router.push(`/cv/${data.id}`);
      store.dispatch(
        addCV({
          id: data.id,
          name,
          elderNumber,
        })
      );
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.create_holder}>
        <input
          type="number"
          placeholder="Elder number"
          value={elderNumber}
          onChange={(e) => setElderNumber(e.target.value)}
          min={1}
          required
        />
        <input
          type="text"
          placeholder="CV name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.keyCode === ENTER_KEYCODE && submitHandler(e)}
          required
        />

        <SendButton>Create</SendButton>
      </div>
    </form>
  );
}
