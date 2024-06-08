# Assignment for slidesai.io internship

TODO:

- [x] Make a basic ui (shadcn ui)
- [x] Get top x messages from gmail
- [ ] Classify them with OpenAI
- [x] Display the result
- [x] Make route to display email (parellel routing)


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

# MAKE SURE YOU HAVE ALL THE ENV VARS SET
mv .env.example .env
pnpm db:push
pnpm dev
```