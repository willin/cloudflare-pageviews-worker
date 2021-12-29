# cloudflare-pageviews-worker

[![GitHub followers](https://img.shields.io/github/followers/willin?logo=github&style=flat-square&label=)](https://github.com/willin) ![GitHub forks](https://img.shields.io/github/forks/willin/cloudflare-pageviews-worker?style=flat-square)

[English](./README.en.md)

## 使用说明

第一步，Fork 本项目，并 Clone 至本地。

- 源码： https://github.com/willin/cloudflare-pageviews-worker
- 镜像： https://gitee.com/willin/cloudflare-pageviews-worker

第二步，配置环境

```bash
# 安装命令行
npm install -g @cloudflare/wrangler
# 登录 Cloudflare
wrangler login
# 创建 KV 存储桶
wrangler kv:namespace create "views" --env production
```

打开 `wrangler.toml`，修改以下配置：

- account_id
- zone_id
- route
- kv_namespaces 中的 id

通过 Github Actions 自动部署，或者手动执行 `wrangler publish --env production` 。

需要在仓库设置中，配置 Secrets。名称为： `CF_API_TOKEN`，传入 Cloudflare 的 API Token。

API Token 生成访问： <https://dash.cloudflare.com/profile/api-tokens> ，选择使用模板 `Edit Cloudflare Workers` 创建即可。

配置成功后需要给 DNS 中添加一条 A 解析，设置为： `192.0.2.1` 并通过 CDN 加速。

![](https://user-images.githubusercontent.com/1890238/147664047-d1240f52-2e95-4ae1-bf24-51058bbf258c.png)

## API

### PUT /pv?slug=optional

QueryString 参数：

- `slug`： string 可选

如果不传，或传入 `total`，则返回为总计点击量。

```js
{
  "result": {
    "slug": "total",
    "pv": 10
  }
}
```

P.S. 其中，GET 请求也可以访问，但仅当 PUT 请求时，会额外将访问计数累加。

### GET /list?slugs=optional,optional

QueryString 参数：

- `slugs`： string 可选，请将 string[] 用 `,` 分隔

如果不传，则返回为总计点击量。

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
