import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const Webpack = (env, argv) => {
  const version = env.version || "v0.0.1";
  const buildDir = env.dist ? path.resolve(process.cwd(), env.dist) : "build";

  return merge(common(env, argv, { version }), {
    mode: "production",
    output: {
      publicPath: "auto",
      path: buildDir,
      filename: `${version}/[name].js`,
      clean: true
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: false })]
    }
  });
};

export default Webpack;
