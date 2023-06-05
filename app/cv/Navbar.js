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
  const [newElderName, setNewElderName] = useState(cv?.name);

  function changeNumber(number) {
    store.dispatch(updateCv({ elderNumber: number }));
  }

  function changeName(name) {
    store.dispatch(updateCv({ name }));
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

        <div className="flex align-center">
          <h1>ELDER-N/</h1>
          {isEditing ? (
            <input
              className="ml-1"
              value={newElderNumber}
              onChange={(e) => {
                setElderNumber(e.target.value);
                changeNumber(e.target.value);
              }}
            />
          ) : (
            <h1>{cv?.elderNumber}</h1>
          )}
          <div className="no-print flex">
            <h1 className="ml-3">Name: </h1>
            {isEditing ? (
              <input
                className="ml-1"
                value={newElderName}
                onChange={(e) => {
                  setNewElderName(e.target.value);
                  changeName(e.target.value);
                }}
              />
            ) : (
              <h1 className="ml-2">{cv?.name}</h1>
            )}
          </div>
        </div>
      </div>
      <div>
        <Image src={logo} alt="elders" className={styles.logo} />
      </div>
    </nav>
  );
}
