import fs from "fs/promises";
import path from "path";
import parse from "@/helpers/bodyParser";
import fileExists from "@/helpers/fileExists";
import { NextResponse } from "next/server";
import { converBase64ToImage } from "convert-base64-to-image";
export async function POST(req) {
  try {
    const { base64String, fileName } = JSON.parse(await parse(req));
    const regex = /^data:image\/(png|jpg|jpeg);base64,/;
    const fileContents = base64String.replace(regex, "");
    const extension = base64String.match(regex)[1];

    const dirPath = path.join("public", "uploads");
    const fullFileName = `${fileName}.${extension}`;
    const filePath = path.join(dirPath, fullFileName);
    const folderExists = await fileExists(dirPath);

    if (!folderExists) {
      await fs.mkdir(dirPath);
    }

    fs.writeFile(filePath, fileContents, "base64");
    return NextResponse.json({
      path: process.env.HOST + "uploads/" + fullFileName,
    });
  } catch (err) {
    console.log("error: ", err);
  }
}
