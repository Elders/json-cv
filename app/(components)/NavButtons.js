"use client";
import store from "@/store/store";
import { setData as setAppData } from "@/store/slices/app";
import { useSelector } from "react-redux";

export default function NavButtons() {
  const { isEditing } = useSelector((state) => state.app);
  const { cv, oldCV } = useSelector((state) => state.app);

  function cancelHandler() {
    store.dispatch(
      setAppData({
        cv: oldCV,
        isEditing: false,
      })
    );
  }

  function toggle() {
    store.dispatch(
      setAppData({
        isEditing: !isEditing,
        oldCV: cv,
      })
    );
  }

  function exportCV() {
    //TODO: export the CV
  }

  return (
    <div>
      {isEditing ? (
        <button type="button" className="no-print" onClick={cancelHandler}>
          Cancel
        </button>
      ) : null}
      <button type="submit" className="no-print" onClick={toggle}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button type="button" className="no-print" onClick={exportCV}>
        Export
      </button>
    </div>
  );
}
