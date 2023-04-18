import getLastSegment from "@/helpers/getLastSegment";
import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(req) {
  const imageName = decodeURI(getLastSegment(req.url));

  const img = await fs.readFile("./images/" + imageName);

  return new NextResponse(img);
  // return NextResponse.json({ a: 20 });
}
