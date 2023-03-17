"use client";
import store from "@/store/store";
import { setData } from "@/store/slices/app";
import { useSelector } from "react-redux";

export default function EditButton() {
  const data = useSelector((state) => state.app);

  function clickHandler() {
    store.dispatch(
      setData({
        isEditing: !data.isEditing,
      })
    );
  }

  return (
    <button className="bg" onClick={clickHandler}>
      {data.isEditing ? "Save" : "Edit"}
    </button>
  );
}
