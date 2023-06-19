"use client";
import axios from "axios";
import { useRef } from "react";
import { addCV } from "@/store/slices/cvs";
import { useRouter } from "next/navigation";
import { DEFAULT_SCHEMA, CURRENT_SCHEMA } from "@/constants";
import store from "@/store/store";
import getMigratedCV from "@/helpers/getMigratedCV.mjs";

export default function ImportButton({ ...rest }) {
  const router = useRouter();
  const inputRef = useRef();

  function importFile() {
    if (!inputRef.current) return;
    inputRef.current.click();
  }

  function changeHandler(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);

    fileReader.onloadend = async () => {
      let importedCV = JSON.parse(fileReader.result);
      try {
        importedCV.schema = DEFAULT_SCHEMA;
        importedCV = getMigratedCV(importedCV, CURRENT_SCHEMA);
      } catch {
        alert("Unsupported CV schema");
      }

      const { data } = await axios.post("/api/createCV", importedCV);
      if (!data.isSuccess) {
        return;
      }

      store.dispatch(addCV({ ...importedCV, id: data.id }));
      router.push("/cv/" + data.id);
    };
  }

  return (
    <div {...rest}>
      <input
        type="file"
        accept=".json"
        ref={inputRef}
        onChange={changeHandler}
      />
      <button onClick={importFile}>Import</button>
    </div>
  );
}
