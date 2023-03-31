import { useState } from "react";
import isNumber from "@/helpers/isNumber";

const ASC = 1;
const DESC = -1;

export default function useSort(items) {
  const [sortedBy, setSortedBy] = useState();
  const [sortedOrder, setSortedOrder] = useState();
  const [sortedItems, setSortedItems] = useState([...items]);

  function sortList(field, currentSort = DESC) {
    const sortTo = currentSort === ASC ? DESC : ASC;
    const sortedItems = [...items].sort((a, b) => {
      const value1 = a[field];
      const value2 = b[field];

      if (isNumber(value1)) {
        return (value1 - value2) * sortTo;
      }

      return value1.localeCompare(value2) * sortTo;
    });

    setSortedBy(field);
    setSortedOrder(sortTo);
    setSortedItems(sortedItems);
    return sortedItems;
  }

  return { sortList, sortedItems, sortedBy, sortedOrder };
}

export { ASC, DESC };
