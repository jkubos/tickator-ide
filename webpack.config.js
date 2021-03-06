var path = require('path');
var webpack = require("webpack");

var config = {
    entry: path.resolve(__dirname, 'entry.jsx'),
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'bundle_new.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader" },
            // {test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            {
              test: /\.less$/,
              loaders: [
                  'style',
                  'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                  'less'
              ]
          },
            {test: /\.js.?$/, loaders: ['babel']},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

module.exports = config;
