const fs = require("fs/promises");

async function main() {
  let fileContents;
  try {
    fileContents = await fs.readFile("./data/cv.json");
    fileContents = JSON.parse(fileContents.toString());
  } catch {}

  if (!fileContents) return;

  for (const cv of fileContents) {
    if(!cv.image) {
      continue;
    }
    cv.image = cv.image.slice(cv.image.lastIndexOf("/"));
    await fs.writeFile(`./data/${cv.id}.json`, JSON.stringify(cv));
  }

  await fs.unlink("./data/cv.json");
}

main();
