import fs from "fs/promises";
import readCVS from "./helpers/readCVS.mjs";
import getMigratedCV from "./helpers/getMigratedCV.mjs";
import { DEFAULT_SCHEMA, CURRENT_SCHEMA } from "./constants.mjs";

async function main() {
  try {
    const cvs = await readCVS();
    cvs.forEach(async (cv) => {
      cv = { ...cv, schema: cv.schema || DEFAULT_SCHEMA };
      cv = getMigratedCV(cv, CURRENT_SCHEMA);
      await fs.writeFile(`./data/${cv.id}.json`, JSON.stringify(cv));
    });
  } catch (err) {}
}

main();

export default { DEFAULT_SCHEMA, CURRENT_SCHEMA };
