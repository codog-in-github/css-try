const { resolve } = require('path')
const fs = require('fs')
const DotEnv = require('dotenv')
DotEnv.config({ path: '.env.local' })
DotEnv.config()
const pages = require('./pages.config.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { log } = require('./node-utils')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
const { PUBLIC_PATH, BUILD_PATH } = process.env
const __root__ = __dirname

// 插件配置
const plugins = pages.map(page => new HtmlWebpackPlugin({
    template: resolve(__root__, `src/page/${page.name}/${page.template ?? 'template'}.html`),
    filename: page.name + '.html',
    chunks: ['common-style', 'common', page.name],
    templateParameters: {
        title: page.title,
        keyword: page.keyword,
        description: page.description,
    }
}))

if(!isDevelopment){
    plugins.push(new MiniCssExtractPlugin({ filename: 'style/[id].[hash].css' }))
}

plugins.push(
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            '**/*',
            '!.git/**'
        ]
    }),
    new ESLintWebpackPlugin()
)

// 入口配置
const entry = {
    'common-style': resolve(__root__, `src/style/public.less`)
}

for(const page of pages) {
    if(!page.name) {
        log.error('The [ name ] is required. Please check your [ page.config.js ]')
        process.exit(1)
    }
    const pagePath = resolve(__root__, 'src/page', page.name)
    const entryJs = resolve(pagePath, 'main.js')
    const entryLess = resolve(pagePath, 'main.less')
    if(fs.existsSync(entryJs)){
        entry[page.name] = entryJs
    } else if(fs.existsSync(entryLess)){
        entry[page.name] = entryLess
    } else {
        log.error(`Can not found file [ main.js ] or [ main.less ] at [ ${pagePath} ]`)
        process.exit(1)
    }
}

// 输出配置
const output =  {
    path: resolve(__root__, isDevelopment ? 'dist' : BUILD_PATH ),
    filename: 'script/[id].[hash].js'
}

if (!isDevelopment) {
    output.publicPath = PUBLIC_PATH
}
// 主配置
module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry,
    output,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:le|c)ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options: { esModule: false }
                    },
                    'less-loader',
                ]
            },
            {
                test: /\.(?:jpe?g|png|webp|gif|svg|eot|woff2?|ttf)$/,
                use: [
                    { loader: 'file-loader', options: { name:'assets/[hash].[ext]' } },
                ],
            },
        ]
    },
    plugins,
    resolve: {
        alias: {
            '#': resolve(__root__),
            '@': resolve(__root__, 'src'),
        }
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new UglifyJsPlugin()
        ],
    },
}
