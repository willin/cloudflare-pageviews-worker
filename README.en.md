# cloudflare-pageviews-worker

[![GitHub followers](https://img.shields.io/github/followers/willin?logo=github&style=flat-square&label=)](https://github.com/willin) ![GitHub forks](https://img.shields.io/github/forks/willin/cloudflare-pageviews-worker?style=flat-square)

[简体中文](./README.md)

## Usage

First step, fork this repo and clone to your local directory.

Sencond, configure environment.

```bash
# Install command line tools
npm install -g @cloudflare/wrangler
# Login Cloudflare
wrangler login
# Create KV Namespace
wrangler kv:namespace create "views" --env production
```

Open and edit `wrangler.toml`:

- account_id
- zone_id
- route
- id in kv_namespaces

You may use Github Actions to deploy automatically or manually execute `wrangler publish --env production`.

Add Secrets in your Github repo settings, and name it `CF_API_TOKEN`, value should pass in Cloudflare API Token.

You can generate an API token from: <https://dash.cloudflare.com/profile/api-tokens> ,select `Edit Cloudflare Workers` to create.

Then add a DNS record, A: `192.0.2.1`, Proxied.

![](https://user-images.githubusercontent.com/1890238/147664047-d1240f52-2e95-4ae1-bf24-51058bbf258c.png)

## API

### PUT /pv?slug=optional

Query:

- `slug`: string, optional

if null, will return total.

Results like:

```js
{
  "result": {
    "slug": "total",
    "pv": 10
  }
}
```

P.S. Use `PUT` method (GET method will not add count).

### GET /list?slugs=optional,optional

Query:

- `slugs`: string, optional, join string[] with `,`

if null, will return total.

Result like:

```js
{
  "result": [
    {
      "slug": "total",
      "pv": 10
    },
    // ...
  ]
}
```

## LICENSE

Apache License 2.0
