import Head from 'next/head';
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
      <Head>
        <title>Tiny React Query</title>
        <meta name="description" content="Creating simplified react query as a tiny package" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Link href="/">🔙</Link>
          {!todoId && status === 'loading' && <p>Loading...</p>}
          {status === 'error' && <p>Error: {error.message}</p>}
          {status === 'success' && (
            <label>
              <h1>{todo.title}</h1>
              <input type="checkbox" defaultChecked={todo.completed} />
            </label>
          )}
          <div> {isFetching && <p>Background updating...</p>}</div>
        </div>
      </main>
    </div>
  );
};

export default Home;
