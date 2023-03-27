"use client";
import { useRef } from "react";
import store from "@/store/store";
import { setData } from "@/store/slices/cvs";
import { setData as setAppData } from "@/store/slices/app";

export default function StoreInitializer({ serverStore }) {
  console.log(serverStore);
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setData(serverStore.cvs));
    store.dispatch(setAppData({ cv: serverStore.app.cv }));

    loaded.current = true;
  }
  return null;
}
