import StoreProvider from "@/app/(components)/StoreProvider";
import CVContent from "@/app/(components)/CVContent";
import findCV from "@/helpers/findCV";
import getCVByID from "@/helpers/getCVById";

export default async function CVPage({ params }) {
  const storedCV = findCV(params.id);
  const cv = storedCV || (await getCVByID(params.id));

  return (
    <StoreProvider>
      <CVContent initialCV={cv} />
    </StoreProvider>
  );
}
