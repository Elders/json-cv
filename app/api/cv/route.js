import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  let data = "[]";

  try {
    data = await fs.readFileSync("./data/cv.json", "utf-8");
  } catch (err) {
    // console.log("ERROR: ", err);
  }

  return NextResponse.json(JSON.parse(data));
}
