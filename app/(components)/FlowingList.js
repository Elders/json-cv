import styles from "@/app/(styles)/flowing.module.scss";

export default function FlowingList({ items, breakingCount = 20, children }) {
  const orderClass =
    items.length <= breakingCount ? styles.fixed : styles.flowing;
  return (
    <div className={`${styles.list_items_holder} ${orderClass}`}>
      {children}
    </div>
  );
}
