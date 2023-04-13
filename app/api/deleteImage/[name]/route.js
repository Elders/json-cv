import fs from "fs/promises";
import readFile from "@/helpers/readFile";
import { NextResponse } from "next/server";
import getLastSegment from "@/helpers/getLastSegment";

export async function DELETE(req) {
  let isSuccess = true;
  const cvImage = decodeURI(getLastSegment(req.url));

  const content = await readFile("./data/cv.json");
  const cv = content.find((cv) => {
    return getLastSegment(cv.image) === cvImage;
  });
  cv.image = null;

  try {
    await fs.writeFile("./data/cv.json", JSON.stringify(content));
    await fs.unlink("./public/uploads/" + cvImage);
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
