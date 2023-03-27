import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ID = searchParams.get("id");
  const cvs = await fs.readFile("./data/cv.json", {
    encoding: "utf-8",
  });

  const cv = JSON.parse(cvs).find((cv) => cv.id === ID);

  return NextResponse.json(cv);
}
