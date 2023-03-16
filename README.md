NOTE: I'm using port 8000 instead of 5000 for the backend because 5000 was in use on my device.

## Why did I use ...

- Vite: Great dev experience (fast hot reloading)
- Tailwind: Perfect for rapid prototyping (but I would also use it professionally)
- Axios: Slightly less boilerplate than fetch
- React Query (Tanstack Query):
  - Built-in UX advantages
  - Implementation simplicity
- Zustand: I like the API

I'm using a lot of packages. Some are overkill for such a tiny feature.  
My tech stack is chosen with the assumption that this questionary is a feature in a larger app (with most of these techs already chosen and available).

The focus was on UX and dev experience.

## Typescript

I used the default tsconfig.json from vite.

## Testing

# Stuff I didn't do or use

- Not using a router, just to save some work.
- Not using suspence, considered loading states to be out of scope
- I did not spend effort on production build optimization and bundling / code-splitting.
- I manually created the API layer and its types. Probably some codegen tool could be used but chose to not spend time on this.

## Tailwind

If you are not used to Tailwind, please keep in mind:

> Now I know what you’re thinking, “this is an atrocity, what a horrible mess!” and you’re right, it’s kind of ugly. In fact it’s just about impossible to think this is a good idea the first time you see it — you have to actually try it.

_Quote from : https://tailwindcss.com/docs/utility-first_
