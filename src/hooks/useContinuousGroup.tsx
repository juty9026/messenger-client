import { useEffect, useState } from "react";

const useContinuousGroup = <T extends unknown>(
  data: T[],
  groupBy: keyof T
): T[][] => {
  const [groups, setGroups] = useState<T[][]>([]);

  // Lint error (react-hooks/exhaustive-deps)
  // https://github.com/facebook/react/pull/19751
  useEffect(() => {
    const groups = data.reduce<T[][]>((acc, cur) => {
      if (acc.length === 0) {
        acc.push([]);
      }
      const target = acc[acc.length - 1];
      if (target.length === 0 || target[0][groupBy] === cur[groupBy]) {
        target.push(cur);
      } else {
        acc.push([cur]);
      }
      return acc;
    }, []);
    setGroups(groups);
  }, [data, groupBy]);

  return groups;
};

export default useContinuousGroup;
