import fs from "fs/promises";
import { NextResponse } from "next/server";
import parse from "@/helpers/bodyParser";
import fileExists from "@/helpers/fileExists";
import generateID from "@/helpers/generateID";

export async function POST(req) {
  let isSuccess = true;
  const result = JSON.parse(await parse(req));
  let CVID = await generateID(result.id, "data");

  const newCV = {
    ...result,
    id: CVID,
  };

  try {
    const folderExists = await fileExists("./data");

    if (!folderExists) {
      await fs.mkdir("./data");
    }
    await fs.writeFile(`./data/${CVID}.json`, JSON.stringify(newCV));
  } catch (err) {
    console.log("ERROR: ", err);
    isSuccess = false;
  }

  return NextResponse.json({ isSuccess, id: CVID });
}
