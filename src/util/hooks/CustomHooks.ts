import {useEffect, useState, useRef, useCallback} from 'react';

export function useDebounceValue<T>(value: T, delay= 300) {
    const [debounce, setDebounce] = useState<T>(value);

    useEffect(()=>{
        const id = setTimeout(()=> setDebounce(value), delay);
        return clearTimeout(id);
    }, [value, delay]);

}

export function useDebounceCallback<T extends (...arg:any[]) => any>(fn:T, delay=300) {
   const timer = useRef<number | null>(null);
   const latestFn = useRef(fn);

    useEffect(() => {
        latestFn.current = fn;
    }, [fn]);

    const cancel = useCallback(() => {
        if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
        }
    }, []);

    const debounced = useCallback((...args: Parameters<T>) => {
        cancel();
            timer.current = window.setTimeout(() => {
            latestFn.current(...args);
            timer.current = null;
        }, delay);
    }, [delay, cancel]);

    useEffect(() => () => cancel(), [cancel]);

    return { run: debounced, cancel };
} 

// export function useThrottle<T extends (...arg:any[])=> any>(fn:T, limit = 300) {
//     const lastCall =useRef(0);
//     const latestFn = useCallback(fn);
// }

export function usetInfiiteScroll<T>(fetchFn:(page:number) => Promise<T[]>) {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const loadMore = useCallback(async () => {
        if (loading || finished) return;

        setLoading(true);
        const newItems = await fetchFn(page);

        if (newItems.length === 0) {
             setFinished(true);
        } else {
            setItems(prev => [...prev, ...newItems]);
            setPage(prev => prev + 1);
        }
        setLoading(false);
    }, [page, loading, finished, fetchFn]);

    return { items, loadMore, loading, finished };
}


type ThrottleOptions = { leading?: boolean; trailing?: boolean };

export function useThrottledCallback<T extends (...args: any[]) => any>(
  fn: T,
  limit = 300,
  options: ThrottleOptions = { leading: true, trailing: false }
) {
  const lastCall = useRef<number | null>(null);
  const timer = useRef<number | null>(null);
  const latestFn = useRef(fn);

  useEffect(() => { latestFn.current = fn; }, [fn]);

  const cancel = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const throttled = useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    if (lastCall.current === null) {
      lastCall.current = now;
      if (options.leading) {
        latestFn.current(...args);
        return;
      }
    }

    const remaining = limit - ((now) - (lastCall.current ?? 0));
    if (remaining <= 0) {
      cancel();
      lastCall.current = now;
      latestFn.current(...args);
    } else if (options.trailing) {
      // 스로틀 기간 후에 마지막 호출을 실행
      cancel();
      timer.current = setTimeout(() => {
        lastCall.current = Date.now();
        timer.current = null;
        latestFn.current(...args);
      }, remaining) as unknown as number;
    }
  }, [limit, options.leading, options.trailing, cancel]);

  useEffect(() => () => cancel(), [cancel]);

  return { run: throttled, cancel };
}


export function usePaginatedQuery(fetchFn: any) {
  const [page, setPage] = useState(1);

  const next = (params = {}) =>
    fetchFn({ page, ...params }).then((res: any) => {
      setPage(page + 1);
      return res;
    });

  return { next, page };
}



export function useCart<T>() {
  const [cart, setCart] = useState<T[]>([]);

  const add = (item: T) => setCart(prev => [...prev, item]);
  const remove = (id: string | number) =>
    setCart(prev => prev.filter((x: any) => x.id !== id));
  const clear = () => setCart([]);

  return { cart, add, remove, clear };
}

export function useFavorite(initial: boolean = false) {
  const [fav, setFav] = useState(initial);
  const toggle = () => setFav(prev => !prev);
  return { fav, toggle };
}

export function useScrollToTop() {
  const ref = useRef<any>(null);
  const scrollToTop = () => ref.current?.scrollToOffset?.({ offset: 0 });
  return { ref, scrollToTop };
}

export function useScrollBottom(height: number){
    const ref = useRef<any>(null);
    const scrollToBottom = () => ref.current?.scrollToOffset?.({offset: height});
    return {ref, scrollToBottom};
}



export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const lastCalled = useRef(0);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      lastCalled.current = now;
      callback(...args);
    }
  };
}