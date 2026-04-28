import { init } from "@paralleldrive/cuid2";

let createCustomId: (() => string) | undefined;

export function cuid() {
  if (!createCustomId) {
    createCustomId = init({
      length: 16,
    });
  }

  return createCustomId();
}
