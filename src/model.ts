import * as DB from 'worktop/kv';
import type { KV } from 'worktop/kv';

declare const VIEWS: KV.Namespace;

export interface PageView {
  slug: string;
  pv: number;
}

export async function find(slug: string): Promise<number> {
  const result = await DB.read(VIEWS, slug, 'text');
  const views = Number(result || 0) + 1;
  await DB.write(VIEWS, slug, `${views}`);
  return views;
}

export function list(slugs: string[]): Promise<PageView[]> {
  return Promise.all(
    slugs.map((slug) => DB.read(VIEWS, slug, 'text').then((views): PageView => ({ slug, pv: Number(views || 0) })))
  );
}
