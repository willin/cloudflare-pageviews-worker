import { Router } from 'worktop';
import { listen } from 'worktop/cache';
import * as PageViews from './routes';

const API = new Router();

// View one page
API.add('GET', '/pv', PageViews.PV);
API.add('GET', '/list', PageViews.List);
API.add('GET', '/*', PageViews.NoutFound);

// eslint-disable-next-line @typescript-eslint/unbound-method
listen(API.run);
