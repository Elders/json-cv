import Image from "next/image";
import logo from "@/assets/logo.svg";
import styles from "@/app/(styles)/navbar.module.scss";
export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <Image src={logo} alt="elders" />
        <div>
          <button>New +</button>
          <button>Import</button>
        </div>
      </nav>
      <div></div>
    </>
  );
}
