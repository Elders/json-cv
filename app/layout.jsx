import "./globals.scss";
import styles from "./layout.module.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="container">
          <div className={styles.layout_holder}>{children}</div>
        </div>
      </body>
    </html>
  );
}
