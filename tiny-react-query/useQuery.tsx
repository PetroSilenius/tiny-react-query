import { useContext, useEffect, useReducer, useRef } from 'react';
import { QueryClient, queryClientContext } from 'tiny-react-query/QueryClient';

export const useQuery = <T, K>(
  queryKey: QueryOptions['queryKey'],
  queryFn: QueryOptions['queryFn']
) => {
  const client = useContext(queryClientContext);
  const observerRef = useRef<QueryObserver>(null);

  const [, rerender] = useReducer((i) => i + 1, 0);

  if (!observerRef.current) {
    observerRef.current = createQueryObserver<T, K>(client, { queryKey, queryFn });
  }

  useEffect(() => {
    return observerRef.current.subscribe(rerender);
  }, []);

  return observerRef.current.getResult();
};

const createQueryObserver = <T, K>(client: QueryClient, { queryKey, queryFn }: QueryOptions) => {
  const query = client.getQuery<T, K>({ queryKey, queryFn });

  const observer = {
    notify: () => {},
    getResult: () => query.state,
    subscribe: (callback) => {
      observer.notify = callback;
      const unsubscribe = query.subscribe(observer);

      query.fetch();

      return unsubscribe;
    },
  };

  return observer;
};
