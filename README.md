# cloudflare-pageviews-worker

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
wrangler kv:namespace create "views_prod"
wrangler kv:namespace create "views_dev"
```

打开 `wrangler.toml`，修改以下配置：

- account_id
- zone_id
- route
- kv_namespaces 中的 id （填入 `views_prod` 的 id） 和 preview_id （填入 `views_dev` 的 id），或者共用一个存储桶
