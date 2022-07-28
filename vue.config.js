const path = require("path");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@Components": path.resolve(__dirname, "src/components/"),
      },
      extensions: [".js", ".vue", ".json"],
    },
    devServer: {
      host: "localhost",
      port: 3001,
    },
  },
});
