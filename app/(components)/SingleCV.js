"use client";
import { useRouter } from "next/navigation";

export default function SingleCV({ cv }) {
  const router = useRouter();
  function openCV(id) {
    router.push(`/cv/${id}`);
  }

  return (
    <div onClick={() => openCV(cv.id)} className="pointer">
      {cv.name}{" "}
    </div>
  );
}
