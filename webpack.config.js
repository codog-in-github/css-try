const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

const plugins = [
    new HtmlWebpackPlugin({ template: resolve(__dirname, 'index.html') })
]
if(!isDevelopment){
    plugins.push(new MiniCssExtractPlugin())
}

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: resolve(__dirname, 'src/main.js'),
    },
    output: {
        path: resolve(__dirname,'dist'),
        filename: '[name].js',
    },
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
                test: /\.(?:jpe?g|png|gif)$/,
                use: 'file-loader',
            }
        ]
    },
    plugins,
}