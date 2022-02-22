const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        design: resolve(__dirname, 'src/main.js')
    },
    output: {
        path: resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    { loader:'style-loader' },
                    { loader:'css-loader' },
                    { loader:'less-loader' },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: resolve(__dirname, 'index.html')})
    ]
}