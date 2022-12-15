// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const isProduction = process.env.NODE_ENV == "production";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const config = {
  // 根据环境变量决定 mode 的值
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./src/index.ts",
    "index.min": "./src/index.ts",
  },
  output: {
    filename: "[name].js", // 输出的文件名
    path: path.resolve(__dirname, "lib"), // 输出的绝对路径
    library: "bamboosUtils", // 类库的命名空间
    globalObject: "this", // 适配 Node.js
    libraryTarget: "umd", // umd 打包规范
    libraryExport: "default",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        loader: "babel-loader",
        exclude: ["/node_modules/"],
        include: path.resolve(__dirname, "./src/"), // 只解析 src 目录下的文件
      },
      {
        test: /\.(ts|tsx)$/i,
        use: [
          {
            loader: "babel-loader",
          },
          { loader: "ts-loader" },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./src/"), // 只解析 src 目录下的文件
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          {
            loader: "style-loader",
            // options: {
            //   insert: "top", // 将样式插入到<head>
            //   injectType: "singletonStyleTag", // 将所有的style标签合并成一个
            // },
          },
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [new CleanWebpackPlugin()],
  externals: {
    react: {
      commonjs: "react", // CommonJS 模块
      commonjs2: "react", // CommonJS 模块
      amd: "react", // AMD 模块
      root: "React", // 全局变量访问
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 使用压缩插件
        include: /\.min\.js$/,
      }),
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
