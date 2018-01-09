import webpack from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
    entry: [path.resolve(__dirname, '../client/index.js')],
    output: {
        path: path.resolve(__dirname, '../client-dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader'
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../client-dist')], {
            root: path.resolve(__dirname, '../')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../client/index.html'),
            filename: 'index.html'
        })
    ]
}
