import "@/app/(styles)/globals.scss";
import { Montserrat } from "@next/font/google";
import styles from "@/app/(styles)/layout.module.scss";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className={`container ${montserrat.variable}`}>
          <div className={styles.layout_holder}>{children}</div>
        </div>
      </body>
    </html>
  );
}
