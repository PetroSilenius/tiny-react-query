import styles from 'styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTodo from 'hooks/useTodo';

const Todo = () => {
  const { query } = useRouter();

  // BUG: bun-framework-next empty next/router query key https://github.com/oven-sh/bun/issues/860
  const todoId = (query.id ?? query['']) as string;

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

export default Todo;
