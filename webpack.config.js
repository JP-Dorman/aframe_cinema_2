const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body'
});

// Convert webpack to es5
module.exports = {
    entry: './node_modules/super-hands/index.js',
    output: {
        filename: './src/vendor/superhands-es5.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ],
    }
};

// Regular actions
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: function (modulePath) {
                    return /node_modules/.test(modulePath) &&
                    !/reaction_components.node_modules/.test(modulePath);
                },
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        ]
},
// add this line
plugins: [HtmlWebpackPluginConfig]
};
