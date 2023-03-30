export default async function parse(req) {
  const chunks = [];

  for await (const chunk of req.body) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString();
}
