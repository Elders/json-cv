import fs from "fs/promises";
import parse from "@/helpers/bodyParser";
import readFile from "@/helpers/readFile";
import { NextResponse } from "next/server";
import getLastSegment from "@/helpers/getLastSegment";

export async function POST(req) {
  let isSuccess = true;

  const data = JSON.parse(await parse(req));
  const cvs = await readFile("./data/cv.json");
  const cv = cvs.find((cv) => cv.id === data.cvId);

  if (cv.image) {
    const imageName = getLastSegment(cv.image);
    await fs.unlink("./public/uploads/" + imageName);
  }

  cv.image = data.newImage;

  try {
    await fs.writeFile("./data/cv.json", JSON.stringify(cvs));
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess });
}
