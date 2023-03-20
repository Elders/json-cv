import store from "@/store/store";
import NavButtons from "./NavButtons";

export default function Navbar() {
  const { cv: cvData } = store.getState();
  return (
    <nav>
      <h1>ELDER N/ {cvData.elderNumber}</h1>
      <NavButtons />
    </nav>
  );
}
