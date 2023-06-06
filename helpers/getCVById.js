import readCVS from "./readCVS";

export default async function getCVByID(id) {
  const cvs = await readCVS();

  return cvs.find((cv) => cv.id === id);
}
