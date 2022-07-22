import styles from '../styles/Home.module.css';
import useTodos from 'hooks/useTodos';
import Link from 'next/link';

const Home = () => {
  const { data: todos, status, isFetching, error } = useTodos();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          {status === 'loading' && <p className={styles.loading}>Loading...</p>}
          {status === 'error' && <p className={styles.error}>Error: {error.message}</p>}
        </div>
        {status === 'success' && (
          <ul>
            {todos.map((todo) => (
              <Link href={`/todo/${todo.id}`} key={todo.id}>
                <a>
                  <li>{todo.title}</li>
                </a>
              </Link>
            ))}
          </ul>
        )}
        <div>{isFetching && <p className={styles.fetching}>Background updating...</p>}</div>
      </main>
    </div>
  );
};

export default Home;
