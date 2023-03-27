"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/(styles)/CV.module.scss";
import logo from "@/assets/logo.svg";
import binIcon from "@/assets/bin.svg";
import Image from "next/image";
import axios from "axios";
import { deleteCV } from "@/store/slices/cvs";
import store from "@/store/store";

export default function SingleCV({ cv }) {
  const router = useRouter();
  function openCV(id) {
    router.push(`/cv/${id}`);
  }

  async function deleteHandler(e) {
    e.stopPropagation();
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/cv/${cv.id}`);
      store.dispatch(deleteCV(cv.id));
    } catch (err) {}
  }

  return (
    <div onClick={() => openCV(cv.id)} className={`${styles.cv_card} pointer`}>
      <Image
        src={binIcon}
        alt="bin"
        className={styles.bin_icon}
        onClick={deleteHandler}
      />
      <div className={styles.img_holder}>
        <Image src={logo} alt="elders" />
      </div>

      <div>
        <div className={styles.cv_name}>{cv.name}</div>
      </div>
    </div>
  );
}
