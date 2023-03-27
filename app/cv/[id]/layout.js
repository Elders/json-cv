import StoreProvider from "@/app/(components)/StoreProvider";
import FormWrapper from "@/app/(components)/FormWrapper";

import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <StoreProvider>
      {" "}
      <FormWrapper>
        <Navbar />
        {children}
      </FormWrapper>
    </StoreProvider>
  );
}
