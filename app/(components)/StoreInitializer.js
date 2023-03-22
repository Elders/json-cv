"use client";
import { useRef } from "react";
import store from "@/store/store";
import { setData } from "@/store/slices/cv";
import { setData as setAppData } from "@/store/slices/app";

export default function StoreInitializer({ data }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    console.log("data: ", data);
    store.dispatch(setData(data));
    store.dispatch(setAppData({ cv: data || {} }));
    loaded.current = true;
  }
  return null;
}
