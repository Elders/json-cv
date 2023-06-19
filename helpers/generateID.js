import crypto from "crypto";
import readFile from "./readFile.mjs";

export default async function generateID(defaultID, checkFolder) {
  let CVID = defaultID || crypto.randomUUID();
  let invalidID = true;

  while (invalidID) {
    try {
      await readFile(`./${checkFolder}/${CVID}.json`);
      CVID = crypto.randomUUID();
    } catch {
      invalidID = false;
    }
  }

  return CVID;
}
