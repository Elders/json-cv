"use client";
import NavButtons from "@/app/(components)/NavButtons";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "@/assets/home-icon.png";
import navStyles from "@/app/(styles)/navbar.module.scss";
import store from "@/store/store";
import { setData as setAppData } from "@/store/slices/app";

export default function Navbar() {
  function stopEdit() {
    store.dispatch(setAppData({ isEditing: false }));
  }

  return (
    <nav className={`${navStyles.navbar} ${navStyles.sticky} no-print`}>
      <Link href="/" onClick={stopEdit}>
        <Image src={homeIcon} alt="home icon" width={32} height={32} /> Home
      </Link>
      <NavButtons />
    </nav>
  );
}
