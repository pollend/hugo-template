const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [{
    entry: {
        'main': './src/js/script.js',
        'style': './src/sass/style.scss'
    },
    resolve: {
        modules: ['node_modules', 'bower_components'],
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.scss']
    },
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, 'static'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract({ loader: 'css-loader!resolve-url-loader!sass-loader?sourceMap=true'})
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=./[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.tether': 'tether',
            'window.Tether': 'tether',
            'Tether': 'tether',
            'Popper': 'popper.js',
            'window.Popper': 'popper.js'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}];