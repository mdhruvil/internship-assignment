# Assignment for slidesai.io internship

NOTE: please read your twitter(X) dm.  My profile is https://x.com/mdhruvill  

And If you don't select me. Please tell me where I lack and How can I improve.

DEMO: [https://github.com/mdhruvil/slides-ai-assignment/blob/main/demo.webm](https://github.com/mdhruvil/slides-ai-assignment/blob/main/demo.webm)

TODO:

- [x] Make a basic ui (shadcn ui)
- [x] Get top x messages from gmail
- [ ] Classify them with OpenAI
- [x] Display the result
- [x] Make route to display email (parellel routing)

## Tech stack
- [Next.js](https://nextjs.org/)
- [Hono](https://hono.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://github.com/shadcn/ui)
- [Typescript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)


## folder structure
```
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts // auth route
│   │   │   └── v1
│   │   │       └── [[...route]]
│   │   │           └── route.ts // api route
│   │   ├── emails
│   │   │   ├── [id] // display email details
│   │   ├── layout.tsx
│   │   ├── page.tsx // display all emails
│   ├── components
│   ├── env.js
│   ├── lib // gmail api, open ai api logic lives here
│   ├── server
│   │   ├── api // hono api
│   │   ├── auth.ts // auth config
│   │   └── db // db config
│   └── styles
```

How to run locally:

```bash
git clone https://github.com/mdhruvil/slides-ai-assignment
pnpm install

# MAKE SURE YOU HAVE ALL THE ENV VARS SET READ ALL INSTRUCTIONS IN .env.example
mv .env.example .env
pnpm db:push
pnpm dev
```