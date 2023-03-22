import axios from "axios";
import CV from "./(components)/CV";
import Navbar from "./(components)/Navbar";
import CVList from "./(components)/CVList";
import StoreInitializer from "./(components)/StoreInitializer";
import store from "@/store/store";
import { setData } from "@/store/slices/cv";
import StoreProvider from "./(components)/StoreProvider";

async function initData() {
  const { data } = await axios.get(process.env.HOST + "api/cv");

  store.dispatch(setData(data));
  return data;
}

export default async function Home() {
  const cvData = await initData();

  return (
    <>
      <StoreInitializer data={cvData} />
      <Navbar />
      <CVList />
      {/* <StoreProvider>
        <CV />
      </StoreProvider> */}
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
