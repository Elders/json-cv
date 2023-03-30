"use client";
import axios from "axios";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { addCV } from "@/store/slices/cvs";
import { useRouter } from "next/navigation";
import store from "@/store/store";

export default function ImportButton({ ...rest }) {
  const router = useRouter();
  const inputRef = useRef();
  const storedCVS = useSelector((state) => state.cvs);

  function importFile() {
    if (!inputRef.current) return;
    inputRef.current.click();
  }

  function changeHandler(e) {
    const fileReader = new FileReader();
    const text = fileReader.readAsText(e.target.files[0]);

    fileReader.onloadend = async () => {
      const importedCV = JSON.parse(fileReader.result);

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
