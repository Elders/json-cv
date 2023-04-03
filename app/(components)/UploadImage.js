"use client";
import { forwardRef } from "react";
import { Upload } from "lucide-react";

export default forwardRef(function UploadImage(
  { onChange, ...rest },
  inputRef
) {
  function uploadFile() {
    inputRef.current?.click();
  }

  function changeHandler(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    onChange && onChange(url, file);
  }

  return (
    <div {...rest}>
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
});
