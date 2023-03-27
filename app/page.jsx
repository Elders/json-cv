import CV from "./(components)/CV";

import CVList from "./(components)/CVList";
import StoreInitializer from "./(components)/StoreInitializer";
import store from "@/store/store";
import { setData } from "@/store/slices/cvs";
import StoreProvider from "./(components)/StoreProvider";
import Navbar from "./(components)/Navbar";

async function initData() {
  const response = await fetch(process.env.HOST + "api/cv", {
    cache: "no-store",
  });

  const data = await response.json();

  return data;
}

export default async function Home() {
  const cvData = await initData();

  return (
    <>
      <Navbar />
      <CVList initData={cvData} />
      <StoreProvider>
        <CV />
      </StoreProvider>
    </>
  );
}

export const metadata = {
  title: "JSON CV",
  description: "The CV builder of Elders",
  icons: {
    icon: "/favicon.ico",
  },
};
