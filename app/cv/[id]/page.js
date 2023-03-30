import StoreProvider from "@/app/(components)/StoreProvider";

import CVContent from "@/app/(components)/CVContent";
import Navbar from "./Navbar";
import store from "@/store/store";
import { setData as setAppData } from "@/store/slices/app";
import findCV from "@/helpers/findCV";

export default async function CVPage({ params }) {
  let cv = findCV(params.id);
  if (!cv) {
    const response = await fetch(
      `${process.env.HOST}/api/getCVByID?id=${params.id}`,
      { cache: "no-store" }
    );

    cv = await response.json();
  }

  store.dispatch(setAppData({ cv }));

  return (
    <StoreProvider>
      <CVContent initialCV={cv} />
    </StoreProvider>
  );
}
