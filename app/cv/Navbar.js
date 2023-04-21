"use client";
import store from "@/store/store";

import person from "@/assets/person.svg";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "@/app/(styles)/CV.module.scss";
import { useSelector } from "react-redux";
import { updateCv } from "@/store/slices/app";
import { useState } from "react";

export default function Navbar({ cv }) {
  const { isEditing } = useSelector((state) => state.app);
  const [newElderNumber, setElderNumber] = useState(cv?.elderNumber);

  function changeNumber(number) {
    store.dispatch(updateCv({ elderNumber: number }));
  }

  return (
    <nav className={styles.cv_navbar}>
      <div>
        <div className={styles.img_wrapper}>
          {cv?.image ? (
            <Image
              src={cv.image}
              alt=""
              width={70}
              height={70}
              loader={() => cv.image}
              className={`no-print ${styles.cv_picture}`}
            />
          ) : null}

          <Image src={person} alt="a person" />
        </div>

        <h1>
          ELDER-N/{" "}
          {isEditing ? (
            <input
              value={newElderNumber}
              onChange={(e) => {
                setElderNumber(e.target.value);
                changeNumber(e.target.value);
              }}
            />
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
