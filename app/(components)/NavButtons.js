"use client";
import store from "@/store/store";
import { setData as setAppData } from "@/store/slices/app";
import { useSelector } from "react-redux";

export default function NavButtons() {
  const { isEditing } = useSelector((state) => state.app);
  const cv = useSelector((state) => state.cv);

  function cancelHandler() {
    store.dispatch(
      setAppData({
        cv,
        isEditing: false,
      })
    );
  }

  function toggle() {
    if (!isEditing) {
      store.dispatch(
        setAppData({
          cv: store.getState().cv,
        })
      );
    }

    store.dispatch(
      setAppData({
        isEditing: !isEditing,
      })
    );
  }

  return (
    <>
      {isEditing ? (
        <button type="button" className="bg" onClick={cancelHandler}>
          Cancel
        </button>
      ) : null}

      <button type="submit" className="bg" onClick={toggle}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </>
  );
}
