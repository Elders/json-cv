import axios from "axios";

export default async function CVList() {
  const { data: cvs } = await axios.get(process.env.HOST + "api/cv");

  return (
    <div>
      {cvs.map((cv) => {
        return <div key={cv.elderNumber}>ELDER {cv.elderNumber}</div>;
      })}
    </div>
  );
}
