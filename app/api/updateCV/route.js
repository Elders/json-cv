import { NextResponse } from "next/server";
import fs from "fs/promises";
import bodyParser from "@/helpers/bodyParser";
import readFile from "@/helpers/readFile.mjs";

export async function POST(req) {
  let isSuccess = true;
  let updatedCV = await bodyParser(req);
  updatedCV = JSON.parse(updatedCV.toString());
  const cvID = updatedCV.id;

  // let currentContent = await readFile("./data/cv.json");
  // const newContent = currentContent.map((cv) => {
  //   return cv.id === updatedCV.id ? { ...updatedCV, image: cv.image } : cv;
  // });

  // Do not update image

  try {
    await fs.writeFile(`./data/${cvID}.json`, JSON.stringify(updatedCV));
  } catch (err) {
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
