export default function reduceObjField(arr, field) {
  return arr
    ? arr.reduce((a, b) => {
        return [...a, b[field]];
      }, [])
    : [];
}
