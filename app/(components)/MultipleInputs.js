"use client";
import { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";

export default function MultipleInputs({
  items,
  onChange,
  ratings,
  updateRating,
  deleteRating,
}) {
  const [renderItems, setRenderItems] = useState(items);

  useEffect(() => {
    if (!renderItems.length || renderItems[renderItems.length - 1]) {
      setRenderItems([...renderItems, ""]);
    }

    onChange(renderItems);
  }, [renderItems]);

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
      deleteRating();
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
      {renderItems.map((item, index) => {
        return (
          <div key={index}>
            <input
              value={item}
              onChange={(e) => updateItem(e, index)}
              className="mr-1"
            />
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
