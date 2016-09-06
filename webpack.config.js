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
            {test: /\.jsx$/, loaders: ['babel']},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};

module.exports = config;
