const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const nodeExternals = require('webpack-node-externals');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-cheap-module-source-map',

    module: {
        rules: [
            { test: /\.scss$/, loader: 'null-loader' },
            { test: /\.css$/, loader: 'null-loader' },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});

