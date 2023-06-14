import styles from "@/app/(styles)/RatingPlaceholder.module.scss";

export default function RatingPlaceholder({ isFilled }) {
  const fillClass = isFilled ? styles.filled : "";
  return <div className={`${styles.symbol} ${fillClass}`}></div>;
}
