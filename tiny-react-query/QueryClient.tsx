import { createContext, useEffect } from 'react';

export const queryClientContext = createContext<QueryClient>(null);

export const QueryClientProvider = ({
  children,
  client,
}: {
  children: JSX.Element | JSX.Element[];
  client: QueryClient;
}) => {
  useEffect(() => {
    const onFocus = () => {
      client.queries.forEach((query) => {
        query.subscribers.forEach((subscriber) => subscriber.fetch());
      });
    };

    window.addEventListener('visibilitychange', onFocus, false);
    window.addEventListener('focus', onFocus, false);

    return () => {
      window.removeEventListener('visibilitychange', onFocus, false);
      window.removeEventListener('focus', onFocus, false);
    };
  }, [client]);

  return <queryClientContext.Provider value={client}>{children}</queryClientContext.Provider>;
};

export class QueryClient {
  queries: Query[];
  subscribers: Array<() => void>;

  constructor() {
    this.queries = [];
    this.subscribers = [];
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

  subscribe = (callback) => {
    this.subscribers.push(callback);

    return () => {
      this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
    };
  };

  notify = () => {
    this.subscribers.forEach((callback) => {
      callback();
    });
  };
}

export const createQuery = <T, K>(
  client: QueryClient,
  { queryKey, queryFn, cacheTime = 5 * 60 * 1000 }
) => {
  let query: Query<T, K> = {
    queryKey,
    queryHash: JSON.stringify(queryKey),
    promise: null,
    subscribers: [],
    garbageCollectionTimeout: null,
    state: {
      status: 'loading',
      isFetching: true,
      lastUpdated: null,
      data: null,
      error: null,
    },

    subscribe: (subscriber) => {
      query.subscribers.push(subscriber);

      query.unscheduleGarbageCollection();

      return () => {
        query.subscribers = query.subscribers.filter((s) => s !== subscriber);

        if (query.subscribers.length === 0) {
          query.scheduleGarbageCollection();
        }
      };
    },

    scheduleGarbageCollection: () => {
      query.garbageCollectionTimeout = setTimeout(() => {
        client.queries = client.queries.filter((q) => q !== query);
      }, cacheTime);

      client.notify();
    },

    unscheduleGarbageCollection: () => {
      if (query.garbageCollectionTimeout) {
        clearTimeout(query.garbageCollectionTimeout);
        query.garbageCollectionTimeout = null;
      }
    },

    setState: (updaterFn) => {
      query.state = updaterFn(query.state);
      query.subscribers.forEach((subscriber) => subscriber.notify());
      client.notify();
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
              lastUpdated: Date.now(),
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
