"use client";

import { useState } from "react";

export default function SendButton({ children, onClick }) {
  const [loading, setLoading] = useState(false);

  async function clickHandler(e) {
    setLoading(true);
    onClick && (await onClick(e));
    setLoading(false);
  }

  return (
    <button onClick={clickHandler} disabled={loading}>
      {children}
    </button>
  );
}
