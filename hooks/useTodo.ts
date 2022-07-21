import { useQuery } from '@tanstack/react-query';
import { sleep } from 'hooks/useTodos';

const useTodo = (todoId: string) => {
  return useQuery<Todo, Error>(['todo', todoId], async () => {
    console.log('13. useTodo: fetching todo');
    await sleep(1000);
    console.log('slept');

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    const data = await response.json();

    return data;
  });
};

export default useTodo;
