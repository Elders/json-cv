"use client";
import { useState, useEffect } from "react";
import Rating from "react-rating";
import Input from "./Input";
import RatingPlaceholder from "./RatingPlaceholder";

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
  ...rest
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }} {...rest}>
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
              <div className="mt-1">
                <Rating
                  initialRating={ratings[index]}
                  emptySymbol={<RatingPlaceholder />}
                  fullSymbol={<RatingPlaceholder isFilled={true} />}
                  onChange={(newRating) => updateRating(newRating, index)}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
