"use client";
import { useRef } from "react";
import store from "@/store/store";
import { setData } from "@/store/slices/cv";

export default function StoreInitializer({ data }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setData(data));
    loaded.current = true;
  }
  return null;
}
