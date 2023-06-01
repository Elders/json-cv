"use client";
import { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";

export default function MultipleInputs({
  items,
  onChange,
  ratings,
  showLabel,
  defaultLabels,
  mainLabelText,
  updateRating,
  deleteRating,
}) {
  const [renderItems, setRenderItems] = useState(items);
  const [labelElements, setLabelElements] = useState(defaultLabels || []);

  useEffect(() => {
    if (!renderItems.length || renderItems[renderItems.length - 1]) {
      setRenderItems([...renderItems, ""]);
    }

    onChange(renderItems, labelElements);
  }, [renderItems, labelElements]);

  function updateItem(e, index) {
    const newItems = [...renderItems];
    newItems[index] = e.target.value;
    setRenderItems(newItems);

    if (index === renderItems.length - 1 && e.target.value) {
      setRenderItems((renderItems) => [...renderItems, ""]);
      return;
    }

    if (e.target.value) return;

    if (index === renderItems.length - 2 && !renderItems[index + 1]) {
      const updatedItems = [...newItems];
      updatedItems.splice(index, 1);
      setRenderItems(updatedItems);
      ratings && deleteRating();
    }
  }

  function updateLabel(e, index) {
    const labels = [...labelElements];
    labels[index] = e.target.value;
    setLabelElements(labels);
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
      {renderItems.map((item, index) => {
        return (
          <div key={index}>
            {showLabel ? (
              <div className="my-2">
                <label className="mb-2">Label: </label>
                <input
                  value={labelElements[index] || ""}
                  onChange={(e) => updateLabel(e, index)}
                  className="mr-1"
                />
              </div>
            ) : null}
            <div>
              <label className="mb-2">{mainLabelText}</label>
              <input
                value={item}
                onChange={(e) => updateItem(e, index)}
                className="mr-1"
              />
            </div>

            {ratings ? (
              <ReactStars
                count={5}
                onChange={(newRating) => updateRating(newRating, index)}
                size={24}
                half={false}
                value={ratings[index]}
                color2={"#e40521"}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
