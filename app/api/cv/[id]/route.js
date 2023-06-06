import { NextResponse } from "next/server";
import fs from "fs/promises";

export async function DELETE(req) {
  let success = false;
  const lastSlashIndex = req.url.lastIndexOf("/");
  const id = req.url.slice(lastSlashIndex + 1);

  try {
    await fs.unlink(`./data/${id}.json`);

    success = true;
  } catch (err) {
    console.log("ERROR: ", err);
  }

  return NextResponse.json(success);
}
