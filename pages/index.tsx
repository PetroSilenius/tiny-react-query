import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useTodos from 'hooks/useTodos';
import Link from 'next/link';

const Home = () => {
  const { data: todos, status, isFetching, error } = useTodos();

  return (
    <div className={styles.container}>
      <Head>
        <title>Tiny React Query</title>
        <meta name="description" content="Creating simplified react query as a tiny package" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'error' && <p>Error: {error.message}</p>}
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
          <div> {isFetching && <p>Background updating...</p>}</div>
        </div>
      </main>
    </div>
  );
};

export default Home;
