const { resolve } = require('path')
const fs = require('fs')
const DotEnv = require('dotenv')
DotEnv.config({ path: '.env.local' })
DotEnv.config()
const pages = require('./pages.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
const { PUBLIC_PATH, BUILD_PATH } = process.env

// 插件配置
const plugins = pages.map(page => new HtmlWebpackPlugin({ 
    template: resolve(__dirname, `src/page/${page.name}/${page.template ?? 'template'}.html`),
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
    })
)

// 入口配置
const entry = {
    'common-style': resolve(__dirname, `src/style/public.less`)
}

for(const page of pages) {
    const pagePath = resolve(__dirname, 'src/page', page.name)
    const entryJs = resolve(pagePath, 'main.js')
    const entryLess = resolve(pagePath, 'main.less')
    if(fs.existsSync(entryJs)){
        entry[page.name] = entryJs
    } else if(fs.existsSync(entryLess)){
        entry[page.name] = entryLess
    } else {
        console.log(
            require('chalk').bgRed(' Error '),
            `Can not found file [ ${entryJs} ] or [ ${entryLess} ]`
        )
        process.exit()
    }
}

// 输出配置
const output =  {
    path: resolve(__dirname, isDevelopment ? 'dist' : BUILD_PATH ),
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
            '@': resolve(__dirname, 'src')
        }
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new UglifyJsPlugin()
        ],
    },
}
