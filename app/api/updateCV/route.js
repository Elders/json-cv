import { NextResponse } from "next/server";
import fs from "fs/promises";
import bodyParser from "@/helpers/bodyParser";
import readFile from "@/helpers/readFile";

export async function POST(req) {
  let isSuccess = true;
  let updatedCV = await bodyParser(req);
  updatedCV = JSON.parse(updatedCV.toString());

  let currentContent = await readFile("./data/cv.json");
  const newContent = currentContent.map((cv) => {
    return cv.id === updatedCV.id ? updatedCV : cv;
  });

  try {
    await fs.writeFile("./data/cv.json", JSON.stringify(newContent));
  } catch (err) {
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
