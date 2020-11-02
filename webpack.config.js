const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const glob=require('glob');
const { argv } = require('yargs');
const { merge } = require('webpack-merge');
const AfterHtmlPlugin = require('./build/AfterHtmlPlugin');

const entry={};
const htmlPlugin=[];
const mode = argv.mode;
const envConfig=require(`./build/webpack.${mode}.js`)
// 匹配符合规则文件列表
const files=glob.sync('src/client/views/**/*.entry.js');
files.forEach(file => {
    if(/([A-Za-z]+\-[A-Za-z]+)\.entry\.js$/.test(file)){
        const entryKey=RegExp.$1;
        const [pageName,actionName]=entryKey.split('-');
        entry[entryKey]=`./src/client/views/${pageName}/${entryKey}.entry.js`;
        htmlPlugin.push(
            new HtmlWebpackPlugin({
                template: `./src/client/views/${pageName}/pages/${actionName}.html`,
                filename: `../views/${pageName}/pages/${actionName}.html`,
                inject: false,
                chunks: ['runtime',entryKey],
                // 因为static静态资源服务器直接映射到assets文件夹（相当于把assets静态文件直接上传到cdn上）
                // 所以得将publicPath设成根路径,直接以根路径的形式插入到html文件中
                publicPath: '/',
            })
        )
    }
})
const baseConfig = {
    mode,
    entry,
    output:{
         /**
         *   clean-webpack-plugin will remove files inside the directory below
         */
        path: path.join(__dirname, './dist/client/assets'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },{
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ],
    },
    plugins: [
        new AfterHtmlPlugin(),
        // 也可以在package.json中script里面加"preclient:dev": "rm -rf ./dist"
        new CleanWebpackPlugin(),
        ...htmlPlugin,
        new MiniCssExtractPlugin(),
    ]
};

module.exports=merge(baseConfig,envConfig);