import fs from "fs/promises";
import crypto from "crypto";
import { NextResponse } from "next/server";
import parse from "@/helpers/bodyParser";
import readFile from "@/helpers/readFile";
import fileExists from "@/helpers/fileExists";

export async function POST(req) {
  let isSuccess = true;
  const currentContent = await readFile("./data/cv.json", []);
  const result = JSON.parse(await parse(req));
  let CVID = result.id || crypto.randomUUID();

  while (currentContent.includes(CVID)) {
    CVID = crypto.randomUUID();
  }

  const newCV = {
    id: CVID,
    ...result,
  };

  currentContent.push(newCV);

  try {
    const folderExists = await fileExists("./data");

    if (!folderExists) {
      await fs.mkdir("./data");
    }
    await fs.writeFile("./data/cv.json", JSON.stringify(currentContent));
  } catch (err) {
    console.log("ERROR: ", err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess, id: CVID });
}
