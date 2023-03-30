export default async function parse(req) {
  const chunks = [];

  for await (const chunk of req.body) {
    console.log("chunk: ", chunk);
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString();
}
