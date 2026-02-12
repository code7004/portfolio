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
      port: argv.port || 80,
      historyApiFallback: true,
      open: true,
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
