import { useEffect, useState } from "react";
import isNumber from "@/helpers/isNumber";

const ASC = 1;
const DESC = -1;

export default function useSort(items) {
  const [sortedBy, setSortedBy] = useState();
  const [sortedOrder, setSortedOrder] = useState();
  const [sortedItems, setSortedItems] = useState([...items]);

  function sortList(field, currentSort = DESC) {
    if (!field) return items;
    const sortTo = currentSort === ASC ? DESC : ASC;
    const sortedItems = [...items].sort((a, b) => {
      const value1 = a[field];
      const value2 = b[field];

      if (!value1 && value1 !== 0) {
        return -1 * sortTo;
      }

      if (isNumber(value1)) {
        const secondValue = value2 || 0;
        return (value1 - secondValue) * sortTo;
      }

      return value1.localeCompare(value2) * sortTo;
    });

    setSortedBy(field);
    setSortedOrder(sortTo);
    setSortedItems(sortedItems);

    console.log("SSSSORTED ITEMS: ", sortedItems);
    return sortedItems;
  }

  useEffect(() => {
    const newOrder = sortedOrder === ASC ? DESC : ASC;
    setSortedItems(sortList(sortedBy, newOrder));
  }, [items]);

  return { sortList, sortedItems, sortedBy, sortedOrder };
}

export { ASC, DESC };
