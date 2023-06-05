"use client";
import store from "@/store/store";
import { setData as setAppData } from "@/store/slices/app";
import { useSelector } from "react-redux";
import { updateCV } from "@/store/slices/cvs";
import axios from "axios";

export default function NavButtons() {
  const { cv, oldCV, isEditing, showRatings } = useSelector(
    (state) => state.app
  );

  function cancelHandler() {
    store.dispatch(
      setAppData({
        cv: oldCV,
        isEditing: false,
      })
    );
  }

  function toggleRatings() {
    store.dispatch(
      setAppData({
        showRatings: !showRatings,
      })
    );
  }

  function exportCV() {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cv));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", cv.name + ".json");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function saveData() {
    store.dispatch(
      setAppData({
        isEditing: !isEditing,
        oldCV: cv,
      })
    );

    if (!isEditing) return;

    store.dispatch(updateCV(cv));
    axios.post("/api/updateCV", cv);
  }

  return (
    <div>
      <button type="button" className="no-print" onClick={toggleRatings}>
        Toggle Ratings
      </button>
      {isEditing ? (
        <button type="button" className="no-print" onClick={cancelHandler}>
          Cancel
        </button>
      ) : null}
      <button type="button" className="no-print" onClick={saveData}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button type="button" className="no-print" onClick={exportCV}>
        <a href=""></a>
        Export JSON
      </button>
      <button type="button" className="no-print" onClick={() => window.print()}>
        <a href=""></a>
        Export PDF
      </button>
    </div>
  );
}
