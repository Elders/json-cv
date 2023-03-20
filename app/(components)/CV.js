// "use client";
// import { useState } from "react";
// import { useSelector } from "react-redux";

import CVContent from "./CVContent";
import FormWrapper from "./FormWrapper";
import Navbar from "./Navbar";
import Image from "next/image";
import waves from "@/assets/waves.svg";
import styles from "@/app/(styles)/CV.module.scss";

export default function CV() {
  // const [isAdding, setIsAdding] = useState(false);
  // const data = useSelector((state) => state.cv);

  return (
    <FormWrapper className={styles.cv_wrapper}>
      <Navbar />
      <Image src={waves} alt="waves" className={styles.waves} />
      <CVContent />
    </FormWrapper>
  );
}
