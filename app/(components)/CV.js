// "use client";
// import { useState } from "react";
// import { useSelector } from "react-redux";

import CVContent from "./CVContent";
import FormWrapper from "./FormWrapper";
import Navbar from "./Navbar";

export default function CV() {
  // const [isAdding, setIsAdding] = useState(false);
  // const data = useSelector((state) => state.cv);

  return (
    <FormWrapper>
      <Navbar />

      <CVContent />
    </FormWrapper>
  );
}
