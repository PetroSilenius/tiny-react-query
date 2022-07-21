interface QueryState<T, K> {
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
  state: QueryState<T, K>;
  subscribe: (QueryObserver) => void;
  fetch: () => void;
  setState: (state: any) => void;
}

interface QueryObserver {
  notify: () => void;
  getResult: () => QueryState;
  subscribe: (callback) => void;
}

interface QueryOptions {
  queryKey: string[];
  queryFn: () => Promise<any>;
}
