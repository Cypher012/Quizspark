import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

const isRemote = process.env.DB_TARGET! === "remote";

const localConfig: Config = {
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/1486aff08a8f378b0e0e08bbdeb8bc622c76191f886a3a9a30352b8e0999df93.sqlite",
  },
};

const remoteConfig: Config = {
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
};

export default defineConfig({
  ...(isRemote ? remoteConfig : localConfig),
});
