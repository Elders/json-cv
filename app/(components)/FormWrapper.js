"use client";
import { useSelector } from "react-redux";
import store from "@/store/store";
import { updateCV } from "@/store/slices/cvs";
import axios from "axios";

export default function FormWrapper({ children, ...rest }) {
  const { cv, isEditing } = useSelector((state) => state.app);

  function submitHandler(e) {
    e.preventDefault();

    if (isEditing) return;

    store.dispatch(updateCV(cv));
    axios.post("/api/updateCV", cv);
  }

  return (
    <form onSubmit={submitHandler} {...rest}>
      {children}
    </form>
  );
}
