import fs from "fs/promises";
import crypto from "crypto";
import { NextResponse } from "next/server";
import parse from "@/helpers/bodyParser";
import readFile from "@/helpers/readFile";

export async function POST(req) {
  let isSuccess = true;
  const CVID = crypto.randomUUID();
  const result = await parse(req);

  const newCV = {
    id: CVID,
    name: result,
  };

  const currentContent = await readFile("./data/cv.json", []);
  currentContent.push(newCV);

  try {
    await fs.writeFile("./data/cv.json", JSON.stringify(currentContent));
  } catch (err) {
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess, id: CVID });
}
