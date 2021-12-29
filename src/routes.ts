import type { Handler } from 'worktop';

export const PV: Handler = async function PageView(req, res) {
  const slug = req.query.get('slug');
  await Promise.resolve();
  res.send(200, { slug });
};

export const List: Handler = async function PageViewsSearch(req, res) {
  const slugs = (req.query.get('slugs') ?? '').split(',');
  await Promise.resolve();
  res.send(200, { slugs });
};

export const Views: Handler = async function PageViewsTotal(req, res) {
  await Promise.resolve();
  res.send(200, { slug: 'total' });
};
