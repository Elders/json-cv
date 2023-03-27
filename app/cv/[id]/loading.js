import CVContent from "@/app/(components)/CVContent";
import StoreProvider from "@/app/(components)/StoreProvider";
import Navbar from "./Navbar";

export default function Loading() {
  return (
    <StoreProvider>
      <CVContent cv={{}} />
    </StoreProvider>
  );
}
