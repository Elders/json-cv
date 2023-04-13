import readFile from "./readFile";

export default async function readCVS() {
  return await readFile("./data/cv.json", []);
}
