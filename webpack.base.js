
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    resolve: {
        // 定义 import 引用时可省略的文件后缀名
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/i,
                loader: "babel-loader",
                exclude: ["/node_modules/"],
                include: path.resolve(__dirname, "./src/"), // 只解析 src 目录下的文件
              },
            //   {
            //     test: /\.(ts|tsx)$/i,
            //     use: [
            //       {
            //         loader: "babel-loader",
            //       }
            //     ],
            //     exclude: /node_modules/,
            //     include: path.resolve(__dirname, "./src/"), // 只解析 src 目录下的文件
            //   },
        ]
    },
    plugins: [new CleanWebpackPlugin()],
}; 