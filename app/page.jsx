import CVTable from "./(components)/CVTable";
import Navbar from "./(components)/Navbar";
import fetchCVS from "@/helpers/fetchCVS";

export default async function Home() {
  const cvData = await fetchCVS();

  return (
    <>
      <Navbar />
      <CVTable initData={cvData} />
    </>
  );
}

export const metadata = {
  title: "JSON CV",
  description: "The CV builder of Elders",
  icons: {
    icon: "/favicon.ico",
  },
};
