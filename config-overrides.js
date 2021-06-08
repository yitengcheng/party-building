const path = require("path");
const {
  override,
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  overrideDevServer,
} = require("customize-cra");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: "http://192.168.100.106:9999",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  };
};

module.exports = {
  webpack: override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {},
    }),
    addWebpackAlias({
      "@": resolve("src"),
    }),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true, //这里一定要写true，css和less都不行哦
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
};
