const path = require('path');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PROD_ENV = false;

module.exports = {
    context: path.resolve(__dirname, './../src'),

    entry: {
        app: './index.jsx',
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            require('babel-plugin-transform-object-rest-spread'),
                            'transform-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                include: helpers.root('src'),
                loader: 'url-loader',
                query: {
                    name: '[path][name].[hash:8].[ext]',
                    limit: 4096,
                },
            },
        ]
    },
};