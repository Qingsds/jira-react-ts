import { useEffect, useRef, useState } from "react";

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/* { [key: string]: unknown }  键值对对象*/
export const cleanObject = (obj: { [key: string]: unknown }) => {
  let result = { ...obj };
  Object.keys(result).forEach((key) => {
    let value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = <T>(value: T, delay?: number) => {
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

export const useDocumentTitle = (title: string, isKeepMount = true) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!isKeepMount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, isKeepMount]);
};

export const restRouter = () => {
  window.location.href = window.location.origin;
};
