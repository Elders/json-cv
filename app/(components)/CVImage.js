import { Trash2 } from "lucide-react";
import Image from "next/image";
import styles from "@/app/(styles)/CVImage.module.scss";

export default function CVImage({ onDelete, ...rest }) {
  return (
    <div className={styles.image_holder}>
      <Image {...rest} />
      <Trash2 className={styles.trash} size={20} onClick={onDelete} />
    </div>
  );
}
