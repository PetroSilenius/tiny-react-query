import styles from 'styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTodo from 'hooks/useTodo';

const Home = () => {
  const { query } = useRouter();
  const todoId = query.id;

  const { data: todo, status, isFetching, error } = useTodo(todoId);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.backButton}>
          <Link href="/">🔙</Link>
        </div>
        <div>
          {status === 'loading' && <p className={styles.loading}>Loading...</p>}
          {status === 'error' && <p className={styles.error}>Error: {error.message}</p>}
        </div>
        {status === 'success' && (
          <label>
            <input type="checkbox" defaultChecked={todo.completed} />
            {todo.title}
          </label>
        )}
        <div>{isFetching && <p className={styles.fetching}>Background updating...</p>}</div>
      </main>
    </div>
  );
};

export default Home;
