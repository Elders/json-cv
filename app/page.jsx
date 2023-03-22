import axios from "axios";
import CV from "./(components)/CV";
import StoreInitializer from "./(components)/StoreInitializer";
import store from "@/store/store";
import { setData } from "@/store/slices/cv";
import StoreProvider from "./(components)/StoreProvider";

async function initData() {
  const { data } = await axios.get(process.env.HOST + "api/cv");
  // const dispatchData = Object.keys(data).length ? data : null;
  store.dispatch(setData(data));
  return data;
}

export default async function Home() {
  const cvData = await initData();

  return (
    <>
      <StoreInitializer data={cvData} />
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
