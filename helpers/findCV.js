import store from "@/store/store";

export default function findCV(id) {
  return store.getState().cvs?.find((cv) => cv.id === id);
}
