import * as DB from 'worktop/kv';
import type { KV } from 'worktop/kv';

declare let VIEWS: KV.Namespace;

export interface PageView {
  slug: string;
  pv: number;
}

export async function find(slug: string, add = true): Promise<number> {
  const result = await DB.read(VIEWS, slug, 'text');
  const views = Number(result || 0) + (add ? 1 : 0);
  await DB.write(VIEWS, slug, `${views}`);
  return views;
}

export function list(slugs: string[]): Promise<PageView[]> {
  return Promise.all(
    slugs.map((slug) => DB.read(VIEWS, slug, 'text').then((views): PageView => ({ slug, pv: Number(views || 0) })))
  );
}
