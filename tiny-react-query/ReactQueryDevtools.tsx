import { useContext, useEffect, useReducer } from 'react';
import { queryClientContext } from 'tiny-react-query/QueryClient';
import styles from 'styles/DevTools.module.css';

const ReactQueryDevtools = () => {
  const client = useContext(queryClientContext);
  const [, rerender] = useReducer((i) => i + 1, 0);

  useEffect(() => {
    return client.subscribe(rerender);
  });

  return (
    <div className={styles.panel}>
      {[...client.queries]
        .sort((a, b) => a.queryHash.localeCompare(b.queryHash))
        .map((query) => (
          <div key={query.queryHash}>
            {`${JSON.stringify(query.queryKey, null, 2)} - `}
            <span>
              {query.state.isFetching ? (
                <span>fetching</span>
              ) : !query.subscribers.length ? (
                <span>no subscribers</span>
              ) : query.state.status === 'success' ? (
                <span>success</span>
              ) : query.state.status === 'error' ? (
                <span>error</span>
              ) : null}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ReactQueryDevtools;
