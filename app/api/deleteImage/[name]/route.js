import fs from "fs/promises";
import { NextResponse } from "next/server";
import getLastSegment from "@/helpers/getLastSegment";
import getCVByID from "@/helpers/getCVById";

export async function DELETE(req) {
  let isSuccess = true;

  const cvID = decodeURI(getLastSegment(req.url));
  const cv = await getCVByID(cvID);

  cv.image = null;

  try {
    await fs.writeFile(`./data/${cvID}.json`, JSON.stringify(cv));
  } catch (err) {
    console.log("error: ", err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
