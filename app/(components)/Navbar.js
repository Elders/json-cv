import Image from "next/image";
import CreateCV from "./CreateCV";
import logo from "@/assets/logo.svg";
import ImportButton from "./ImportButton";
import styles from "@/app/(styles)/navbar.module.scss";
export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <Image src={logo} alt="elders" />
        <ImportButton className={styles.import_btn} />
      </nav>
      <CreateCV />
    </>
  );
}
