import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <main className={styles.main}></main>;
}

export const metadata = {
  title: "JSON CV",
  description: "The CV builder of Elders",
  icons: {
    icon: "/favicon.ico",
  },
};
