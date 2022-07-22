# tiny-react-query

This is a simplistic and minimal implementation of `react-query`, now called `@tanstack/react-query`. The implementation is heavily inspired by Tanner Linsleys [talk at React Summit 2021](https://www.youtube.com/watch?v=9SrIirrnwk0).

The implementation is lackluster and not meant for any kind of real usage. It was done for the sole reason of better understanding the inner workings of `react-query`.

## Implemented functionalities

- QueryClient
  - QueryClientProvider
  - useQueryClient hook
  - QueryCache
  - Window focus refetching
- useQuery hook
  - Stale time
  - Cache time

## Getting Started

Clone the repository

```bash
  git clone https://github.com/PetroSilenius/tiny-react-query.git
```

Change to the project directory

```bash
  cd tiny-react-query
```

Install project dependencies

```bash
  bun install
```

Run the development server

```bash
  bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can compare the implementation with the original one by changing the imports in `pages/_app.tsx` and `hooks`.

## Learn More

Click on the links to learn more about the technologies

- [TanStack Query](https://tanstack.com/query)
- [bun](https://bun.sh/)
- [Next.js](https://nextjs.org/docs)
