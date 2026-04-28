import type { AuthBindings, AuthInstance } from "@/utils/auth";

export type AppEnv = {
  Bindings: AuthBindings;
  Variables: {
    user: AuthInstance["$Infer"]["Session"]["user"] | null;
    session: AuthInstance["$Infer"]["Session"]["session"] | null;
  };
};
