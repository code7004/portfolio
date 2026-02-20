// webpack.dev.js
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const Webpack = (env, argv) => {
  const custom = {
    appName: argv.name || "client",
    version: env.version || "v0.0.1",
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }
  };

  return merge(common(env, argv, custom), {
    mode: "development",
    devtool: env.debug ? "inline-source-map" : "eval",
    output: {
      publicPath: "/",
      clean: true
    },
    devServer: {
      host: "localhost",
      port: argv.port || 3000,
      historyApiFallback: true,
      open: true,
      proxy: [
        {
          context: ["/api"],
          target: "https://dummyjson.com",
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            "^/api": ""
          }
        }
      ],
      client: {
        overlay: {
          errors: true,
          warnings: false
        },
        logging: "info"
      }
    }
  });
};

export default Webpack;
