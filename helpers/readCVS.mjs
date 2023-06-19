import fs from "fs/promises";
import readFile from "./readFile.mjs";

export default async function readCVS() {
  const result = [];
  let fileNames = [];

  try {
    fileNames = await fs.readdir("./data");
  } catch {}

  for (const file of fileNames) {
    const currentCV = await readFile(`./data/${file}`);
    result.push(currentCV);
  }

  return result;
}
