import { useQuery } from '@tanstack/react-query';

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const useTodos = () => {
  return useQuery<Todo[], Error>(['todos'], async () => {
    await sleep(1000);

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const data = await response.json();

    return data.slice(0, 5);
  });
};

export default useTodos;
