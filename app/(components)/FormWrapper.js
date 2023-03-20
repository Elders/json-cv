"use client";
import { useSelector } from "react-redux";
import store from "@/store/store";
import { setData } from "@/store/slices/cv";
import axios from "axios";

export default function FormWrapper({ children }) {
  const { cv, isEditing } = useSelector((state) => state.app);

  function submitHandler(e) {
    e.preventDefault();
    if (isEditing) return;
    store.dispatch(setData(cv));
    axios.post("/api/cv", { ...cv });
  }

  return <form onSubmit={submitHandler}>{children}</form>;
}
