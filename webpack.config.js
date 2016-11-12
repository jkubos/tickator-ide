var path = require('path');
var webpack = require("webpack");

var BUNDLE_DIR = path.resolve(__dirname, '../src/main/resources/public/js/');

var config = {
    entry: path.resolve(__dirname, 'entry.jsx'),
    output: {
        path: BUNDLE_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader" },
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            {test: /\.js.?$/, loaders: ['babel']},
            {
                test: /\.(otf|eot|svg|ttf|woff)/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

module.exports = config;
