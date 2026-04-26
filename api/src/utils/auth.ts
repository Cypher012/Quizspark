import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "@/db/index";
import { env } from "cloudflare:workers";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: env.BACKEND_URL,
  trustedOrigins: [env.FRONTEND_URL],
  database: drizzleAdapter(createDb(env.DB), {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.BACKEND_URL}/api/auth/callback/google`,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      redirectURI: `${env.BACKEND_URL}/api/auth/callback/github`,
    },
  },
  plugins: [openAPI()],
});
