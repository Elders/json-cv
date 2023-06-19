export default function parseReferences(references = [], labels = []) {
  return references
    .map((ref, index) => {
      return {
        link: ref,
        label: labels[index],
      };
    })
    .filter((ref) => ref.link);
}
