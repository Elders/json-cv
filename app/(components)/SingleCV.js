"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Confirm from "./Confirm";
import styles from "@/app/(styles)/CV.module.scss";
import logo from "@/assets/logo.svg";
import binIcon from "@/assets/bin.svg";
import Image from "next/image";
import axios from "axios";
import { deleteCV } from "@/store/slices/cvs";
import store from "@/store/store";

export default function SingleCV({ cv }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  function openCV(id) {
    router.push(`/cv/${id}`);
  }

  function confirmDelete(e) {
    e.stopPropagation();
    setShowConfirm(true);
  }

  async function deleteHandler() {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/cv/${cv.id}`);
      store.dispatch(deleteCV(cv.id));
    } catch (err) {}
  }

  return (
    <>
      {" "}
      {showConfirm ? (
        <Confirm
          onConfirm={deleteHandler}
          onCancel={() => setShowConfirm(false)}
        />
      ) : null}
      <div
        onClick={() => openCV(cv.id)}
        className={`${styles.cv_card} pointer`}
      >
        <Image
          src={binIcon}
          alt="bin"
          className={styles.bin_icon}
          onClick={confirmDelete}
        />
        <div className={styles.img_holder}>
          <Image src={logo} alt="elders" />
        </div>

        <div>
          <div className={styles.cv_name}>{cv.name}</div>
        </div>
      </div>
    </>
  );
}
