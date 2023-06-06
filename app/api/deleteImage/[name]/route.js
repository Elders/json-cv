import fs from "fs/promises";
import readFile from "@/helpers/readFile";
import { NextResponse } from "next/server";
import getLastSegment from "@/helpers/getLastSegment";

export async function DELETE(req) {
  let isSuccess = true;
  console.log("requrl: ", req.url);
  const cvImage = decodeURI(getLastSegment(req.url));

  const content = await readFile("./data/cv.json");
  const cv = content.find((cv) => {
    console.log("ls: ", getLastSegment(cv.image), cvImage);
    return getLastSegment(cv.image)?.includes(cvImage);
  });

  const prevImage = getLastSegment(cv.image);
  cv.image = null;

  try {
    await fs.writeFile("./data/cv.json", JSON.stringify(content));
    await fs.unlink("./images/" + prevImage);
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
