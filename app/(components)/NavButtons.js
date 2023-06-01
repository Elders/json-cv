"use client";
import store from "@/store/store";
import { setData as setAppData } from "@/store/slices/app";
import { useSelector } from "react-redux";

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
      <button type="submit" className="no-print">
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
