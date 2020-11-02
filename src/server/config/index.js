const path=require('path')

let config = {
    viewDir: path.join(__dirname,'../../client/views'),
    assetsDir: path.join(__dirname,'../../client/assets'),
};

if (process.env.NODE_ENV === "development") {
  const devConfig = {
    port: "3000",
    cache:false,
  };
  config = {
    ...config,
    ...devConfig
  };
}
if (process.env.NODE_ENV === "production") {
  const prodConfig = {
    port: "8001",
    // disable, set to false
    cache: 'memory',
  };
  config = {
    ...config,
    ...prodConfig
  };
}
module.exports = config;
