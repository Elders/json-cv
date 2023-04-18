import fs from "fs/promises";
import parse from "@/helpers/bodyParser";
import readFile from "@/helpers/readFile";
import { NextResponse } from "next/server";
import getLastSegment from "@/helpers/getLastSegment";
import uploadImage from "@/helpers/uploadImage";

export async function POST(req) {
  let isSuccess = true;

  const data = JSON.parse(await parse(req));
  const cvs = await readFile("./data/cv.json");
  const cv = cvs.find((cv) => cv.id === data.cvId);

  if (cv.image) {
    const imageName = getLastSegment(cv.image);
    await fs.unlink("./images/" + imageName);
  }

  const newImage = await uploadImage(data);

  cv.image = newImage;

  try {
    await fs.writeFile("./data/cv.json", JSON.stringify(cvs));
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess, path: newImage });
}
