import { Router } from 'worktop';
import { listen } from 'worktop/cache';
import { preflight } from 'worktop/cors';
import * as PageViews from './routes';

const API = new Router();
API.prepare = preflight({
  // Allow all origins, or edit it to allow specific origins
  // 如需限制访问修改为你的域名
  origin: '*',
  headers: ['Cache-Control', 'Content-Type'],
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE']
});

API.add('PUT', '/pv', PageViews.PV);
API.add('GET', '/pv', PageViews.PV);
API.add('GET', '/list', PageViews.List);
API.add('GET', '/*', PageViews.NoutFound);

// eslint-disable-next-line @typescript-eslint/unbound-method
listen(API.run);
