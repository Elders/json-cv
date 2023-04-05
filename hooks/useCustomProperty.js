import { useState, useEffect } from "react";

export default function useCustomProperty(propertyName) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      `--${propertyName}`
    );
    setValue(value);
  }, []);

  return value;
}
