"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addCV } from "@/store/slices/cvs";
import SendButton from "./SendButton";
import styles from "../(styles)/CV.module.scss";
import store from "@/store/store";

export default function CreateCV() {
  const [name, setName] = useState("");
  const router = useRouter();

  async function submitHandler() {
    const { data } = await axios.post("/api/createCV", name);
    if (data.isSuccess) {
      router.push(`/cv/${data.id}`);
      store.dispatch(
        addCV({
          id: data.id,
          name,
        })
      );
    }
  }

  return (
    <>
      <div className={styles.create_holder}>
        <input
          type="text"
          placeholder="Name of the CV:"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SendButton onClick={submitHandler}>Create</SendButton>
      </div>
    </>
  );
}
