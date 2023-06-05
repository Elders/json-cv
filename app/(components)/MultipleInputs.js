"use client";
import { useState, useEffect } from "react";
import ReactStars from "react-stars";
import Input from "./Input";

export default function MultipleInputs({
  items,
  onChange,
  ratings,
  dictionary,
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

  function updateItem(value, index) {
    const newItems = [...renderItems];
    newItems[index] = value;
    setRenderItems(newItems);

    if (index === renderItems.length - 1 && value) {
      setRenderItems((renderItems) => [...renderItems, ""]);
      return;
    }

    if (value) return;

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
            <Input
              onChange={(value) => updateItem(value, index)}
              value={item}
              dictionary={dictionary}
              labelText={mainLabelText}
             
            ></Input>

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
