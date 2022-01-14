import { useCallback, useState } from "react";

export const useArray = <T>(array: T[]) => {
  const [value, setValue] = useState(array);

  const add = useCallback(
    (item: T) => {
      setValue([...value, item]);
    },
    [value]
  );

  const removeIndex = useCallback(
    (i: number) => {
      let copy = [...value];
      copy.splice(i, 1);
      setValue(copy);
    },
    [value]
  );

  const clear = useCallback(() => {
    setValue([]);
  }, []);

  return { value, clear, removeIndex, add };
};
