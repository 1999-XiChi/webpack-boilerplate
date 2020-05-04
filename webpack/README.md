# Webpack-boilerplate

## How to start?

1. `yarn install` 安装依赖
2. `yarn hot` 热更新，启动本地服务
3. `yarn watch` 开发模式下的打包
4. `yarn build` 生产模式下的打包

如有疑惑，请参照package.json。

## Webpack学习笔记

以单入口 webpack.config.js为例

### 1.入口（entry）

入口文件

```javascript
const config = {
  entry: './src/index.js'
}

module.exports = config;
```

### 2.输出（output）

打包输出目录

```javascript
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  }
}

module.exports = config;
```

### 3.Loader

loader 用于对模块的源代码进行转换。

#### 实例：解析.styl文件

`yarn add style-loader css-loader -D`

`yarn add stylus stylus-loader -D`

```javascript
const config = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
}
```

### 4.插件（plugin）

plugin是用于扩展webpack的功能，各种各样的plugin几乎可以让webpack做任何与构建先关的事情。目的是解决loader无法解决的问题。

#### 实例：生成html入口文件

`yarn add html-webpack-plugin -D`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html'
    })
  ]
}
```

### 5.模式（mode）

提供 `mode` 配置选项，告知 webpack 使用相应环境的内置优化。

只需在配置对象中提供 `mode` 选项：

```
module.exports = {
  mode: 'production'
};

```

或者从 [CLI](https://webpack.docschina.org/api/cli/) 参数中传递：

```
webpack --mode=production
```

支持以下字符串值：

| 描述                                       | 选项          |
| ---------------------------------------- | ----------- |
| 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 | development |
| 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `TerserPlugin`。 | production  |
| 退出任何默认优化选项                               | none        |

### 6.浏览器兼容性（browser compatibility）
webpack supports all browsers that are ES5-compliant (IE8 and below are not supported). webpack needs Promise for import() and require.ensure(). If you want to support older browsers, you will need to load a polyfill before using these expressions.

### 7.模块热替换（HMR）

在应用程序运行过程中，替换、添加或删除 [模块](https://webpack.docschina.org/concepts/modules/)，而无需重新加载整个页面。

`yarn add webpack-dev-server -D`

```javascript
const webpack = require('webpack');

const config = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
}
```

启动本地服务：

```bash
$ webpack-dev-server
i ｢wds｣: Project is running at http://localhost:8081/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from D:\fontend\works\test\webpack-test
```



