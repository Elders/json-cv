import { Inter } from "@next/font/google";
import ContextProvider from "./ContextProvivder";
import CV from "./(components)/CV";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <ContextProvider>
      <CV />
    </ContextProvider>
  );
}

export const metadata = {
  title: "JSON CV",
  description: "The CV builder of Elders",
  icons: {
    icon: "/favicon.ico",
  },
};
