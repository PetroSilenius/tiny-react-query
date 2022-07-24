// import { useQuery } from '@tanstack/react-query';
import { useQuery } from 'tiny-react-query';

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const useTodos = () => {
  return useQuery<Todo[], Error>(
    ['todos'],
    async () => {
      await sleep(1000);

      const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText ? response.statusText : 'Unknown error');
      }

      return data.slice(0, 5);
    },
    { staleTime: 3000 }
  );
};

export default useTodos;
