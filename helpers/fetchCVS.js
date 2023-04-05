export default async function fetchCVS() {
  const response = await fetch(process.env.HOST + "api/cv", {
    cache: "no-store",
  });

  const data = await response.json();

  return data;
}
