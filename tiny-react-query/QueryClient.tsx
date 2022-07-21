import { createContext } from 'react';

export const queryClientContext = createContext<QueryClient>(null);

export const QueryClientProvider = ({ children, client }) => {
  return <queryClientContext.Provider value={client}>{children}</queryClientContext.Provider>;
};

export class QueryClient {
  queries: Query[];

  constructor() {
    this.queries = [];
  }

  getQuery = <T, K>(options: QueryOptions) => {
    const queryHash = JSON.stringify(options.queryKey);
    let query = this.queries.find((query) => query.queryHash === queryHash);

    if (!query) {
      query = createQuery<T, K>(this, options);
      this.queries.push(query);
    }

    return query;
  };
}

export const createQuery = <T, K>(client: QueryClient, { queryKey, queryFn }) => {
  let query: Query<T, K> = {
    queryKey,
    queryHash: JSON.stringify(queryKey),
    promise: null,
    subscribers: [],
    state: {
      status: 'loading',
      isFetching: true,
      data: null,
      error: null,
    },

    subscribe: (subscriber) => {
      query.subscribers.push(subscriber);
      return () => {
        query.subscribers = query.subscribers.filter((s) => s !== subscriber);
      };
    },

    setState: (updaterFn) => {
      query.state = updaterFn(query.state);
      query.subscribers.forEach((subscriber) => subscriber.notify());
    },

    fetch: () => {
      if (!query.promise) {
        query.promise = (async () => {
          query.setState((state) => ({
            ...state,
            isFetching: true,
            error: undefined,
          }));

          try {
            const data = await queryFn();

            query.setState((state) => ({
              ...state,
              status: 'success',
              data,
            }));
          } catch (error) {
            query.setState((state) => ({
              ...state,
              status: 'error',
              error,
            }));
          } finally {
            query.promise = null;

            query.setState((state) => ({
              ...state,
              isFetching: false,
            }));
          }
        })();
      }

      return query.promise;
    },
  };

  return query;
};
