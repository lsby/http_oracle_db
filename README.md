# http_oracle

使用http协议访问oracle数据库.

## 快速开始

1 在`config/db`配置数据库的用户名,密码,地址.

2 解压驱动.

对于windows,执行:

```shell
npm run unzip_windows
```

对于linux,执行:

```shell
npm run unzip_linux
```

3 安装依赖.

执行:

```shell
npm i
```

4 启动.

启动有多种方法.

直接启动:

```shell
npm run start
```

使用pm2:

```shell
npm run pm2_setlog
npm run pm2_start
```

使用docker:

```shell
npm run docker_build
npm run docker_start
```

或使用[镜像](https://hub.docker.com/r/lsby/http_oracle)

5 使用.

使用`urlencoded`发送`post`请求到`/runsql`即可.

请参考`test/index.js`文件和[库](https://www.npmjs.com/package/oracledb)

## TODO

- [ ] https
- [ ] ip白名单
- [ ] 连接池

