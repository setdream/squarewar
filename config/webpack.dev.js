const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('public'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
    },

    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'resolve-url-loader',
                        },
                        {
                            loader: 'sass-loader?sourceMap',
                        },
                    ],
                }),
            },
        ]
    },
});
