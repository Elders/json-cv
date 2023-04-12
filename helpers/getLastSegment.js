export default function getLastSegment(path) {
  return path.slice(path.lastIndexOf("/") + 1);
}
