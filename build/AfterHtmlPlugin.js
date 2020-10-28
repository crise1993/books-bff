const pluginName = "AfterHtmlPlugin";
const HtmlWebpackPlugin = require("html-webpack-plugin");

let jsArr = [];
let cssArr = [];
class AfterHtmlPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName, // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          console.log("静态资源", data.assets);
          cb(null, data);
          jsArr = data.assets.js;
          cssArr = data.assets.css;
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName, // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          let jsStr = "";
          let cssStr = "";
          console.log(jsArr,cssArr,'----jsArr-----cssArr----');
          jsArr.forEach(item => {
            jsStr += `<script src="${item}"></script>`;
          });
          cssArr.forEach(item => {
            cssStr += `<link href="${item}" rel="stylesheet"></link>`;
          });
          data.html = data.html.replace("<!-- injectjs -->", jsStr);
          data.html = data.html.replace("<!-- injectcss -->", cssStr);
          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}

module.exports = AfterHtmlPlugin;
