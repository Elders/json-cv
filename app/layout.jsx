import "@/app/(styles)/globals.scss";
import { Montserrat } from "@next/font/google";
import styles from "@/app/(styles)/layout.module.scss";
import StoreInitializer from "./(components)/StoreInitializer";
import StoreProvider from "./(components)/StoreProvider";
import readCVS from "@/helpers/readCVS.mjs";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--montserrat",
});

export default async function RootLayout({ children }) {
  const cvData = await readCVS();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <div className={`container ${montserrat.variable}`}>
          <div className={styles.layout_holder}>
            <StoreProvider>{children}</StoreProvider>
          </div>{" "}
          <StoreInitializer state={cvData} />
        </div>
      </body>
    </html>
  );
}
