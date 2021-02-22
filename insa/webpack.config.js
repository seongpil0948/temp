const path = require('path');
// bundle.js 파일에 컴파일된 css를 포함시키지 말고 별도의 css 파일로 분리해서 하나의 파일로 번들링해보자
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack'); //to access built-in plugins

const config = {
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'production',
    devServer: {
        contentBase: __dirname + "/dist/",
        inline: true,
        hot: true,
        host: "localhost",
        port: 5600
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {   //  files should be transformed.(변환해야할 파일)
                test: /\.txt$/,
                // used to do the transforming
                use: 'raw-loader'
            },
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            // {
            //     test: /\.js$/,
            //     include: [
            //         path.resolve(__dirname, 'src/')
            //     ],
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env'],
            //             plugins: ['@babel/plugin-proposal-class-properties']
            //         }
            //     }
            // },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader",   // translates CSS into CommonJS
                    "sass-loader"   // compiles Sass to CSS, using Node Sass by default
                ],
                exclude: /node_modules/
            }
        ]
    },
    /*
        Plugins leveraged to perform(수행하는데 사용된다)
        a wider range of tasks like bundle optimization,
        asset management and injection of environment variables.    
    */
    plugins: [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'style.css' })
    ]
};

const a = Object.assign({}, config, {
    entry: ['./src/main.ts', './src/styles/main.scss'],
    // webpack 이 적용되어 나와야 할 경로
    output: {
        filename: 'intellisys.js',
        path: path.resolve(__dirname, 'dist'),
    },
})
const b = Object.assign({}, config, {
    entry: ['./src/main.ts', './src/styles/main.scss'],
    // webpack 이 적용되어 나와야 할 경로
    output: {
        filename: 'intellisys.js',
        path: path.resolve(__dirname, '../jango/app/static'),
    },
})
module.exports = [a, b]