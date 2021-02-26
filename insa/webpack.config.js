const path = require('path');
// bundle.js 파일에 컴파일된 css를 포함시키지 말고 별도의 css 파일로 분리해서 하나의 파일로 번들링해보자
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack') 

module.exports = (env, argv) => {
    console.log("ENV +++++++ ", argv.mode)
    let outputPath, devTool 
    if (argv.mode === 'production') {
        outputPath = '../saas-web-server/app/static'
        console.log("=== Webpack Production Mode ===")
    } else {
        outputPath = './dist'
        devTool = 'source-map'
        console.log("=== Webpack Develope Mode ===")
    }
    
    return {
    devtool: devTool,
    entry: ['./src/main.ts', './src/styles/main.scss'],
    output: {
        filename: 'intellisys.js',
        path: path.resolve(__dirname, outputPath),
    },        
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, '../src/'),
        },
    },

    module: {
        rules: [
            {   //  files should be transformed.(로더가 적용되어 변활 될 파일)
                test: /\.txt$/,
                // used to do the transforming
                use: 'raw-loader'
            },
            {
                test: /\.(js|ts|tsx)$/,
                include: [
                    path.resolve(__dirname, 'src/')
                ],
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }, 'ts-loader']
            },
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
    plugins: [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'insaStyle.css' })
    ]        
    }    
};

