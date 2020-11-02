const CopyPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path=require('path');

module.exports = {
    output: {
        filename: '[name].[chunkhash:8].js',
    },
    // optimization: {
    //     minimizer: [new OptimizeCSSAssetsPlugin({})],
    //   },
    plugins: [
        new CopyPlugin({
            patterns: [
                // to：path相对output里面的path
                {
                    from: path.join(__dirname, '../src/client/components'),
                    to: '../components',
                    transform(content) {
                        return minify(content.toString(), {
                            // removeComments: true,
                            collapseWhitespace: true,
                            // minifyJS:true, 
                            // minifyCSS:true,
                        });
                    },
                },
                {
                    from: path.join(__dirname, '../src/client/views/layouts'),
                    to: '../views/layouts',
                    transform(content) {
                        return minify(content.toString(), {
                            collapseWhitespace: true,
                        });
                    },
                },
                {
                    from: path.join(__dirname, "../src/client/views/index.html"),
                    to: "../views",
                },
            ],
        }),
        new OptimizeCssAssetsPlugin({})
    ]
};