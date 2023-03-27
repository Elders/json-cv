import fs from "fs/promises";

export default async function readFile(path, defaultValue) {
  let currentContent = defaultValue;
  try {
    currentContent = await fs.readFile(path);
    currentContent = JSON.parse(currentContent.toString());
  } catch (err) {
    if (typeof defaultValue === undefined) {
      throw new Error(err.message);
    }
  }

  return currentContent;
}
