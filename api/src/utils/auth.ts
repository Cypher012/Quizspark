import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "@/db/index";
import { openAPI, admin } from "better-auth/plugins";

export type AuthBindings = {
  DB: D1Database;
  BACKEND_URL: string;
  FRONTEND_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  NODE_ENV: "development" | "production";
};

export function getAuth(env: AuthBindings) {
  return betterAuth({
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
    plugins: [openAPI(), admin()],
  });
}

export type AuthInstance = ReturnType<typeof getAuth>;
