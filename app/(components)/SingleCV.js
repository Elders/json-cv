"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Confirm from "./Confirm";
import styles from "@/app/(styles)/CV.module.scss";
import { Edit2, Eye, Save, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { deleteCV, updateCV } from "@/store/slices/cvs";
import store from "@/store/store";
import { motion } from "framer-motion";
import UploadImage from "./UploadImage";
import toBase64 from "@/helpers/toBase64";
import CVImage from "./CVImage";
import getLastSegment from "@/helpers/getLastSegment";

export default function SingleCV({ cv, onDeleteStart }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(cv.name);
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
      const {
        data: { path },
      } = await axios.post("/api/uploadImage", {
        base64String,
        fileName: cv.name,
      });

      const updatedCV = { ...cv, image: path };

      store.dispatch(updateCV({ ...cv, image: path }));
      axios.post("/api/changeImage", {
        cvId: cv.id,
        newImage: path,
      });
    } catch (err) {
      console.log("err: ", err);
    }
  }

  async function deleteImage() {
    const image = getLastSegment(cv.image);
    const { data } = await axios.delete("/api/deleteImage/" + image);
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

  return (
    <>
      <motion.tr
        exit={{ x: "-500vh", y: 0 }}
        variants={animationPoints}
        whileHover={{ scale: 1.01 }}
      >
        <td className={styles.edno_cv}>
          <UploadImage
            onChange={changeImage}
            className={cv.image ? "hidden" : ""}
            ref={uploadRef}
          />
          {cv.image ? (
            <CVImage
              src={cv.image}
              alt={cv.name}
              width={60}
              height={60}
              className={styles.img}
              loader={() => cv.image}
              onClick={() => uploadRef.current?.click()}
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
      </motion.tr>
    </>
  );
}
