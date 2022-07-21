interface QueryState<T, K> {
  lastUpdated: number;
  status: 'loading' | 'success' | 'error';
  isFetching: boolean;
  data: T;
  error: K;
}

interface Query<T = any, K = any> {
  queryKey: string;
  queryHash: string;
  promise: Promise<any>;
  subscribers: QueryObserver[];
  garbageCollectionTimeout: number;
  state: QueryState<T, K>;
  subscribe: (QueryObserver) => void;
  fetch: () => void;
  setState: (state: any) => void;
  scheduleGarbageCollection: () => void;
  unscheduleGarbageCollection: () => void;
}

interface QueryObserver {
  notify: () => void;
  getResult: () => QueryState;
  subscribe: (callback) => void;
}

interface QueryOptions {
  queryKey: string[];
  queryFn: () => Promise<any>;
  staleTime?: number;
  cacheTime?: number;
}
