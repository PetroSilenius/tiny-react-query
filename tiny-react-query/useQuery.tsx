import { useEffect, useReducer, useRef } from 'react';
import { QueryClient, useQueryClient } from 'tiny-react-query/QueryClient';

const useQuery = <T, K>(
  queryKey: QueryOptions['queryKey'],
  queryFn: QueryOptions['queryFn'],
  { staleTime, cacheTime }: Omit<QueryOptions, 'queryKey' | 'queryFn'> = {}
) => {
  const client = useQueryClient();
  const observerRef = useRef<QueryObserver>(null);

  const [, rerender] = useReducer((i) => i + 1, 0);

  if (!observerRef.current) {
    observerRef.current = createQueryObserver<T, K>(client, {
      queryKey,
      queryFn,
      staleTime,
      cacheTime,
    });
  }

  useEffect(() => {
    return observerRef.current.subscribe(rerender);
  }, []);

  return observerRef.current.getResult();
};

const createQueryObserver = <T, K>(
  client: QueryClient,
  { queryKey, queryFn, staleTime = 0, cacheTime }: QueryOptions
) => {
  const query = client.getQuery<T, K>({ queryKey, queryFn, cacheTime });

  const observer: QueryObserver = {
    notify: () => {},
    getResult: () => query.state,
    subscribe: (callback) => {
      observer.notify = callback;
      const unsubscribe = query.subscribe(observer);

      observer.fetch();

      return unsubscribe;
    },
    fetch: () => {
      if (!query.state.lastUpdated || Date.now() - query.state.lastUpdated > staleTime) {
        query.fetch();
      }
    },
  };

  return observer;
};

export default useQuery;
