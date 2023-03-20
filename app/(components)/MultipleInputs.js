"use client";
import { useState, useEffect } from "react";

export default function MultipleInputs({ items, onChange }) {
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
    }
  }

  return (
    <>
      {renderItems.map((item, index) => {
        return (
          <input
            key={index}
            value={item}
            onChange={(e) => updateItem(e, index)}
          />
        );
      })}
    </>
  );
}
