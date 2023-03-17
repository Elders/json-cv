import store from "@/store/store";
import EditButton from "./EditButton";

export default function Navbar() {
  const { cv: cvData } = store.getState();
  return (
    <nav>
      <h1>ELDER N/ {cvData.elderNumber}</h1>
      <EditButton />
    </nav>
  );
}
