import getLastSegment from "@/helpers/getLastSegment";
import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(req) {
  // const imageName = decodeURI(getLastSegment(req.url));

  console.log("req.url: ", req.url);

  //   const img = await fs.readFile("./images/" + req.url);

  return new NextResponse("asd");
}
