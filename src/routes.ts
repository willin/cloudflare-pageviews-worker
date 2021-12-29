import type { Handler } from 'worktop';
import { find, list, PageView } from './model';

export const PV: Handler = async function PV(req, res) {
  const needAdd = req.method !== 'GET';
  const slug = req.query.get('slug') || 'total';
  const pv = await find(slug, needAdd && slug !== 'total');
  // Total Pageviews
  if (slug !== 'total') {
    await find('total', needAdd);
  }

  const result: PageView = {
    slug,
    pv
  };
  res.send(200, { result });
};

export const List: Handler = async function List(req, res) {
  const slugs = (req.query.get('slugs') || 'total').split(',');
  const result: PageView[] = await list(slugs);
  res.send(200, { result }, { 'cache-control': 'private,max-age=30' });
};

export const NoutFound: Handler = function NoutFound(req, res) {
  res.send(301, {}, { location: 'https://willin.wang/' });
};
