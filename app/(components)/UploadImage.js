"use client";
import { useRef } from "react";
import { Upload } from "lucide-react";

export default function UploadImage({ onChange }) {
  const inputRef = useRef();

  function uploadFile() {
    inputRef.current?.click();
  }

  function changeHandler(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    onChange && onChange(url, file);
  }

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={changeHandler}
        hidden
      />
      <Upload onClick={uploadFile} />
    </div>
  );
}
