```txt
npm install
npm run dev
```

```txt
npm run deploy
```

Usage flow for the three learning models:

- [Course, Topic, Question Flow](./COURSE_TOPIC_QUESTION_FLOW.md)

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
