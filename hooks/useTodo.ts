// import { useQuery } from '@tanstack/react-query';
import { sleep } from 'hooks/useTodos';
import { useQuery } from 'tiny-react-query';

const useTodo = (todoId: string) => {
  return useQuery<Todo, Error>(
    ['todo', todoId],
    async () => {
      await sleep(1000);

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText ? response.statusText : 'Unknown error');
      }

      return data;
    },
    { cacheTime: 5000, enabled: Boolean(todoId) }
  );
};

export default useTodo;
