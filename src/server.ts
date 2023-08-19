import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { schema } from "./schema";
import { indexerProcess } from "@/indexer";
import { env } from "process";

const yoga = createYoga({
  graphqlEndpoint: "/",
  schema,
  context: (req) => {
    return {
      req,
    };
  },
});

const server = createServer(yoga);

server.listen(env.PORT, () => {
  console.log(`\
🚀 Server ready at: http://127.0.0.1:${env.PORT}/
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
});

async function indexer() {
  console.log("Indexer stared ⚒️");

  await indexerProcess().catch((e) => {
    console.error("Indexer failed ❌ 😭");

    const { message, stack } = e;
    console.error(message);
    console.error(stack);

    process.exit(1);
  });

  console.log("Indexer finished ✅ 🎉 😄");

  setTimeout(indexer, 1000 * 60 * 5); // 5 minutes
}

indexer();
