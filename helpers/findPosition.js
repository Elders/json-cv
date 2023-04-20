export default function findPosition(cv, positionID) {
  return cv?.positions?.find(({ id }) => id === positionID);
}
