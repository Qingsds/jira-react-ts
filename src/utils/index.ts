import { useEffect, useState } from "react";

const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (obj: any) => {
  let result = { ...obj };
  Object.keys(result).forEach((key) => {
    let value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = (value: any, delay?: number) => {
  const [result, setResult] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(value);
    }, delay);
    // 每次在 useEffect 处理完之后运行
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return result;
};
