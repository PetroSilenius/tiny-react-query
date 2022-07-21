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

      return data;
    },
    { cacheTime: 5000 }
  );
};

export default useTodo;
