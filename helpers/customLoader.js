export default function customLoader(info) {
  return process.env.NEXT_PUBLIC_HOST + "api/images/" + info.src;
}
