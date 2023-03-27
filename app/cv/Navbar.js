"use client";
import store from "@/store/store";

import person from "@/assets/person.svg";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "@/app/(styles)/CV.module.scss";
import { useSelector } from "react-redux";
import { updateCv } from "@/store/slices/app";

export default function Navbar({ cv }) {
  const { isEditing } = useSelector((state) => state.app);

  function changeNumber(e) {
    const number = e.target.value;
    store.dispatch(updateCv({ elderNumber: number }));
  }

  return (
    <nav className={styles.cv_navbar}>
      <div>
        <Image src={person} alt="a person" />

        <h1>
          ELDER N/{" "}
          {isEditing ? (
            <input value={cv?.elderNumber || ""} onChange={changeNumber} />
          ) : (
            cv?.elderNumber
          )}
        </h1>
      </div>
      <div>
        <Image src={logo} alt="elders" className={styles.logo} />
      </div>
    </nav>
  );
}
