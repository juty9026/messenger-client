import { useCallback, useEffect, useState } from "react";

interface DelayState<T> {
  data: T[];
  finish: boolean;
}
interface DelayApi {
  reset: () => void;
}
const useDelay = <T extends unknown>(data: T[]): [DelayState<T>, DelayApi] => {
  const [delayedData, setDelayedData] = useState<T[]>([]);
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    let timer: NodeJS.Timeout;

    if (delayedData.length === data.length) {
      setFinish(true);
    } else {
      setFinish(false);
      const newMessages = data.slice(0, delayedData.length + 1);
      timer = setTimeout(() => setDelayedData(newMessages), 1500);
    }

    return () => clearTimeout(timer);
  }, [data, delayedData, setDelayedData]);

  const reset = useCallback(() => {
    setDelayedData([]);
    setFinish(false);
  }, [setDelayedData, setFinish]);

  return [{ data: delayedData, finish }, { reset }];
};

export default useDelay;
