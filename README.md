NOTE: I'm using port 8000 instead of 5000 for the backend because 5000 was in use on my device.

You can change to 5000 in src/apiClient/\_utils/endpoint.ts

To run app: `npm run dev`
It should output a localhost url for you.

## State management library

Honestly the only reason why I'm using Zustand (for a small part of the state) is because you specifically asked for a state management library.  
React query is sort of a (server) state manager and for the answers I felt useState was the simplest solution.  
Atomic state management such as Recoil or Jotai could have also been an option, I haven't worked with those before.  
We can talk about it during the interview, it is an interesting topic.

## Why did I use ...

- Vite: Great dev experience (fast hot reloading)
- Tailwind: Perfect for rapid prototyping (but I would also use it professionally)
- Axios: Slightly less boilerplate than fetch
- React Query (Tanstack Query):
  - Built-in UX advantages
  - Implementation simplicity
  - Not much experience with it, wanted to give it a try
- Zustand: I like the API

## Stuff I didn't do or use

- Not using a router, just to save some work.
- I did not spend effort on production build optimization and bundling / code-splitting.
- I manually created the API layer and its types. Probably some codegen tool could be used but chose to not spend time on this.
- Did not add tests
- Did not add much error handling (API errors)
- Did not add loading states
- Did not make it pretty or do much UX except basic stuff

## Tailwind

If you are not used to Tailwind, please keep in mind:

> Now I know what you’re thinking, “this is an atrocity, what a horrible mess!” and you’re right, it’s kind of ugly. In fact it’s just about impossible to think this is a good idea the first time you see it — you have to actually try it.

_Quote from : https://tailwindcss.com/docs/utility-first_
