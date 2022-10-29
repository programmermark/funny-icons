### funny-icon

> 项目很大程度参考`@varlet/icons`，使用`webfont`把 svg 图标生成字体文件。

#### 使用方法

1. 使用`npm run updateSvg`更新新加入的 svg 文件的名称

```
npm run updateSvg
```

2. 连接当前库到 npm 并构建生成字体库

```
npm link or sudo npm link

npm run build
```

3. 更新`package.json`的各个属性，发布到 npm

```
npm publish
```
