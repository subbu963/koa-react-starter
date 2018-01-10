import webpack from 'webpack'
import path from 'path'

export default {
    devtool: 'eval',
    entry: ['react-hot-loader/patch', path.resolve(__dirname, '../client/index.js')],
    output: {
        path: path.resolve(__dirname, '../client-dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'webpack-module-hot-accept']
        }]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin()
    ]
}
