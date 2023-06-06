import fs from "fs/promises";
import parse from "@/helpers/bodyParser";

import { NextResponse } from "next/server";
import uploadImage from "@/helpers/uploadImage";
import getCVByID from "@/helpers/getCVById";
import generateID from "@/helpers/generateID";

export async function POST(req) {
  let isSuccess = true;
  const data = JSON.parse(await parse(req));
  const cv = await getCVByID(data.cvId);

  data.fileName = await generateID(null, "images");
  const newImage = await uploadImage(data);
  cv.image = newImage;

  try {
    await fs.writeFile(`./data/${cv.id}.json`, JSON.stringify(cv));
  } catch (err) {
    console.log(err, cv);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess, path: newImage });
}
