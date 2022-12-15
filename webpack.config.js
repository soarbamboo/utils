
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const isProduction = process.env.NODE_ENV == 'production';
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const config = {
    entry: {
        index: "./src/index.ts",
        Utils: "./src/utils/index.ts",
        Ui:"./src/components/index.ts"
    },
    output: {
        filename: '[name].js', // 输出的文件名
        path: path.resolve(__dirname, "lib"), // 输出的绝对路径
        library: "bamboos", // 类库的命名空间
        globalObject: "this", // 适配 Node.js
        libraryTarget: "umd", // umd 打包规范
        libraryExport: "default",
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/i,
                loader: 'babel-loader',
                exclude: ['/node_modules/'],
                include: path.resolve(__dirname, "./src/"), // 只解析 src 目录下的文件
            },
            {
                test: /\.(ts|tsx)$/i,
                use: [
                    {
                      loader: 'babel-loader'
                    },
                    { loader: 'ts-loader' }
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, "./src/"), // 只解析 src 目录下的文件
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [new CleanWebpackPlugin()],
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
