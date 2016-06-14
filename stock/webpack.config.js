var path = require('path');
var webpack = require('webpack');
var ncp = require('ncp').ncp;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/entry/Index.react.js',
        common: ["react", "react-bootstrap", "react-dom"]
    },
    output: {
        filename: "./out/[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules)/,
            query: {
                presets: ["es2015", "react"]
            },
        }, {
            test: /\.json$/,
            loader: "json-loader"
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("common", "./out/common.js"),
        new ExtractTextPlugin('./out/css/bundle.css'),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};

var source = "./src/lib/";
var destination = "./out/lib/";
ncp.limit = 16;
ncp(source, destination, function(err) {
    if (err) return console.error(err);
    console.log('lib copy success!');
});
source = "./src/css/";
destination = "./out/css";
ncp(source, destination, function(err) {
    if (err) return console.error(err);
    console.log('css copy success!');
});
source = "./src/fonts/";
destination = "./out/fonts";
ncp(source, destination, function(err) {
    if (err) return console.error(err);
    console.log('fonts copy success!');
});
