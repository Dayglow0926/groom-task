import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  //debounce 할 value 를 관리하는 state입니다.
  const [debouncedValue, setDebouncedValue] = useState(value);

  console.log("debouncedValue", debouncedValue);
  //useEffect를 통해 value 값이 delay 시간 안에 계속 변경된다면
  //setTimeout 과 clearTimeout을 반복하며, value값이 변경되는 것을 지연시킵니다.
  useEffect(() => {
    //delay 시간 동안 value를 저장하지 않고 delay 시간이 지나면 set을 통해 value를 저장합니다.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    //useEffect가 종료되면 handler를 삭제합니다.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
