const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackNotifierPlugin = require('webpack-notifier');
const path=require('path');

module.exports={
    watch: true,
    plugins: [
        new CopyPlugin({
            patterns: [
                // to：path相对output里面的path
                { from: path.join(__dirname, '../src/client/components'), to: '../components' },
                { from: path.join(__dirname, '../src/client/views/layouts'), to: '../views/layouts' },
            ],
        }),
        new BundleAnalyzerPlugin(),
        new WebpackNotifierPlugin({title: '图书管理系统bff'}),
    ]
};