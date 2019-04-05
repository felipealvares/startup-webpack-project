const developmentMode = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: developmentMode ? 'development' : 'production',
    entry: './source/index.js',
    devServer: {
        contentBase: './distribution',
        port: 8080,
    },
    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCssAssetsPlugin({})
        ]
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/distribution'
    },
    plugins: [
        new miniCssExtractPlugin({ filename: 'styles.css' }),
        new copyWebpackPlugin([
            { context: 'source/', from: '**/*.html' },
            { context: 'source/', from: 'imgs/**/*' }
        ])
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                miniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)$/,
            use: ['file-loader']
        }]
    }
}