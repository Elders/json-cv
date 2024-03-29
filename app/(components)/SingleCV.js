"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "@/app/(styles)/CV.module.scss";
import { Edit2, Eye, Save, Trash2, Upload } from "lucide-react";

import axios from "axios";
import { updateCV } from "@/store/slices/cvs";
import store from "@/store/store";
import { motion } from "framer-motion";
import UploadImage from "./UploadImage";
import toBase64 from "@/helpers/toBase64";
import CVImage from "./CVImage";
import customLoader from "@/helpers/customLoader.js";

import { flushSync } from "react-dom";

export default function SingleCV({ cv, onDeleteStart }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(cv.name);
  const [showUpload, setShowUpload] = useState(true);
  const router = useRouter();
  const uploadRef = useRef();
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

  async function changeImage(url, file) {
    try {
      const base64String = await toBase64(file);
      await axios.post("/api/changeImage", {
        base64String,
        cvId: cv.id,
      });

      store.dispatch(updateCV({ ...cv, image: base64String }));
    } catch (err) {
      console.log("err: ", err);
    }
  }

  function startChanging() {
    flushSync(() => setShowUpload(true));

    uploadRef.current?.click();
  }

  async function deleteImage() {
    const { data } = await axios.delete("/api/deleteImage/" + cv.id);
    data.isSuccess && store.dispatch(updateCV({ ...cv, image: null }));
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

  useEffect(() => {
    setShowUpload(!cv.image);
  }, [cv.image]);

  return (
    <>
      <motion.tr
        exit={{ x: "-500vh", y: 0 }}
        variants={animationPoints}
        whileHover={{ scale: 1.01 }}
      >
        <td className={styles.edno_cv}>
          {showUpload ? (
            <UploadImage
              onChange={changeImage}
              className={cv.image ? "hidden" : ""}
              ref={uploadRef}
            />
          ) : null}
          {cv.image ? (
            <CVImage
              src={cv.image}
              alt={cv.name}
              width={60}
              height={60}
              className={styles.img}
              loader={customLoader}
              onClick={startChanging}
              onDelete={deleteImage}
            />
          ) : null}
        </td>

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

            <Trash2 onClick={() => onDeleteStart(cv.id)} />
          </div>
        </td>
      </motion.tr>
    </>
  );
}
