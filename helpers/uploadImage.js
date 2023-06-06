import fs from "fs/promises";
import path from "path";
import fileExists from "./fileExists";

export default async function uploadImage(data) {
  const { base64String, fileName } = data;
  const regex = /^data:image\/(png|jpg|jpeg);base64,/;
  const fileContents = base64String.replace(regex, "");
  const extension = base64String.match(regex)[1];

  const dirPath = path.join("images");
  const fullFileName = `${fileName}.${extension}`;
  const filePath = path.join(dirPath, fullFileName);
  const folderExists = await fileExists(dirPath);

  if (!folderExists) {
    await fs.mkdir(dirPath);
  }

  fs.writeFile(filePath, fileContents, "base64");

  // return process.env.HOST + "api/getImage/" + fullFileName;
  return fullFileName;
}
