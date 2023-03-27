import NavButtons from "@/app/(components)/NavButtons";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "@/assets/home-icon.png";
import navStyles from "@/app/(styles)/navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={`${navStyles.navbar} ${navStyles.sticky}`}>
      <Link href="/">
        <Image src={homeIcon} alt="home icon" width={32} height={32} /> Home
      </Link>
      <NavButtons />
    </nav>
  );
}
