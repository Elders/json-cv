import store from "@/store/store";

import NavButtons from "../(components)/NavButtons";
import person from "@/assets/person.svg";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "@/app/(styles)/CV.module.scss";

export default function Navbar({ cv }) {
  return (
    <nav className={styles.cv_navbar}>
      <div>
        <Image src={person} alt="a person" />

        <h1>ELDER N/ {cv?.elderNumber}</h1>
      </div>
      <div>
        <Image src={logo} alt="elders" className={styles.logo} />
      </div>
    </nav>
  );
}
