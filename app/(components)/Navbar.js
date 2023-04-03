import Image from "next/image";
import CreateCV from "./CreateCV";
import logo from "@/assets/logo.svg";
import ImportButton from "./ImportButton";
import styles from "@/app/(styles)/navbar.module.scss";
export default function Navbar({ cv }) {
  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <Image src={logo} alt="elders" />
        </div>

        <ImportButton className={styles.import_btn} />
      </nav>
      <CreateCV />
    </>
  );
}
