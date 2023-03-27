import { NextResponse } from "next/server";
import fs from "fs/promises";
import readFile from "@/helpers/readFile";

export async function DELETE(req) {
  const lastSlashIndex = req.url.lastIndexOf("/");
  const id = req.url.slice(lastSlashIndex + 1);
  let cvs = await readFile("./data/cv.json", []);
  cvs = cvs.filter((cv) => cv.id !== id);

  try {
    fs.writeFile("./data/cv.json", JSON.stringify(cvs));
  } catch (err) {
    console.log("ERROR: ", err);
  }

  return NextResponse.json(cvs);
}
