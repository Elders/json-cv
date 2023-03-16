import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  let data = {};
  try {
    const res = await fs.readFileSync("./data/cv.json", "utf-8");
    data = res;
  } catch (err) {}

  return NextResponse.json(JSON.parse(data));
}

export async function POST(req) {
  let isSuccess = true;
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  let currentContent = await fs.readFileSync("./data/cv.json");
  currentContent = JSON.parse(currentContent.toString());
  const result = Buffer.concat(chunks).toString();

  const newContent = { ...currentContent, ...JSON.parse(result) };

  try {
    fs.writeFileSync("./data/cv.json", JSON.stringify(newContent));
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
