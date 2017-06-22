const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PROD_ENV = false;

module.exports = {
    context: path.resolve(__dirname, './../src'),

    entry: {
        app: './index.js',
    },

    output: {
        path: path.resolve(__dirname, './../public'),
        filename: '[name].[chunkhash].js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './../src/resources/templates/index.ejs'),
            filename: '../public/index.html'
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            require('babel-plugin-transform-object-rest-spread'),
                            require('transform-class-properties')
                        ]
                    }
                }
            },
        ]
    },
};