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
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  const result = Buffer.concat(chunks).toString();

  let isSuccess = true;

  try {
    fs.writeFileSync("./data/cv.json", result);
  } catch (err) {
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
