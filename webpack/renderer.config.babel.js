import path from 'path'
import nodeExternals from 'webpack-node-externals'

export default {
    target: 'node',
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, '../server'),
    output: {
        path: path.resolve(__dirname, '../server-dist'),
        publicPath: '/dist/',
        filename: 'server.js',
        library: 'app',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
