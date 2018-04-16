'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    // All paths we need to include on the build
    entry: [
        path.resolve(__dirname, 'static/js/index.js'),
        path.resolve(__dirname, 'static/sass/index.scss')
    ],
     // Output folder
     output: {
        path: path.resolve(__dirname, 'static/dist'),
        filename: "main.js",
        sourceMapFilename: 'main.map',
        publicPath: '/static/dist/',
        pathinfo: true
    },
    resolve: {
        extensions: ['.json', '.js'],
        modules: [
            path.join(__dirname),
            'node_modules'
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                // use style-loader in development
                fallback: 'style-loader'
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        // Automatically loaded modules. Module (value) is loaded when the
        // identifier (key) is used as free variable in a module.
        // The identifier is filled with the exports of the loaded module.
        // - Enable jQuery to all plugins
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]
};
