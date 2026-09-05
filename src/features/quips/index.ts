import { QUIPS_BY_KIND } from "./quips-list";
import type { QuipKind, QuipRecord } from "./types";

type Options = { kind: QuipKind };

function randomizeQuip(list: QuipRecord[]): QuipRecord {
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomQuip(options: Options): QuipRecord {
  const list = QUIPS_BY_KIND.get(options.kind);

  if (!list) {
    throw new Error(`Cannot randomize quips of kind: "${options.kind}"`);
  }

  return randomizeQuip(list);
}
