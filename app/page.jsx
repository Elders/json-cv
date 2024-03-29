import CVTable from "./(components)/CVTable";
import Navbar from "./(components)/Navbar";
import readCVS from "@/helpers/readCVS.mjs";

export default async function Home() {
  const cvData = await readCVS();

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

export const dynamic = "force-dynamic";
