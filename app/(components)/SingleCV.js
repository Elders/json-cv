"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Confirm from "./Confirm";
import styles from "@/app/(styles)/CV.module.scss";
import { Edit2, Eye, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { deleteCV, updateCV } from "@/store/slices/cvs";
import store from "@/store/store";
import { motion } from "framer-motion";

export default function SingleCV({ cv }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(cv.name);
  const router = useRouter();
  const animationPoints = {
    start: { x: -1000, y: 0 },
    end: { x: 0, y: 0 },
  };

  function openCV(id) {
    router.push(`/cv/${id}`);
  }

  function startEdit(e) {
    e.stopPropagation();
    setEdit(true);
  }

  function confirmDelete(e) {
    e.stopPropagation();
    setShowConfirm(true);
  }

  async function deleteHandler() {
    setShowConfirm(false);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/cv/${cv.id}`);
      store.dispatch(deleteCV(cv.id));
    } catch (err) {}
  }

  function save() {
    const updated = { ...cv, name };
    axios.post("/api/updateCV", updated);
    store.dispatch(updateCV(updated));
    setEdit(false);
  }

  function redirect() {
    openCV(cv.id);
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
      <tr>
        <td>{cv.img ? <Image src={cv.image} alt={cv.name} /> : "-"}</td>
        <td>{cv.elderNumber || "-"}</td>
        <td>
          {edit ? (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            cv.name
          )}
        </td>
        <td className={styles.actions_holder}>
          <div>
            <Eye size={28} onClick={redirect} />
            {edit ? <Save onClick={save} /> : <Edit2 onClick={startEdit} />}

            <Trash2 onClick={confirmDelete} />
          </div>
        </td>
        {/* <motion.div
          exit={{ x: 0, y: "100vh" }}
          variants={animationPoints}
          whileHover={{ scale: 1.1 }}
          onClick={redirect}
          className={`${styles.cv_card} ${activeClass} pointer`}
        >
          <div className={styles.icons}>
            {edit ? (
              <Image src={tickIcon} alt="save" onClick={save} />
            ) : (
              <Edit onClick={startEdit} />
            )}

            <Image
              src={binIcon}
              alt="bin"
              className={styles.bin_icon}
              onClick={confirmDelete}
            />
          </div>
          <div className={styles.img_holder}>
            <Image src={logo} alt="elders" />
          </div>

          <div className={styles.cv_name}>
            {edit ? (
              <input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <div>{cv.name}</div>
            )}
          </div>
        </motion.div>{" "}
        */}
      </tr>
    </>
  );
}
