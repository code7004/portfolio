import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

const Webpack = (env, argv, custom) => {
  const { appName, version = "v000000", minify, mode } = custom;
  console.log(appName, "build version : ", version, JSON.stringify(argv), JSON.stringify(env), JSON.stringify(custom));
  return {
    devServer: {
      port: 3000,
      historyApiFallback: true,
      proxy: [
        {
          context: ["/api"],
          target: "https://dummyapi.io/data/v1",
          changeOrigin: true,
          secure: false
        }
      ]
    },
    entry: { main: "./src/index.tsx" },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".scss"],
      alias: { "@": path.resolve(process.cwd(), "src") },
      symlinks: false,
      cacheWithContext: false
    },
    performance: {
      maxEntrypointSize: 10240000,
      maxAssetSize: 10240000
    },
    module: {
      rules: [
        { test: /\.md$/, loader: "ignore-loader" },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({ React: "react" }),
      new HtmlWebpackPlugin({
        title: appName,
        template: "./public/index.html",
        // favicon: "./public/favicon.ico",
        minify
      }),
      new ESLintPlugin({
        files: "src",
        extensions: ["js", "jsx", "ts", "tsx"],
        overrideConfigFile: path.resolve(process.cwd(), "eslint.config.js"),
        cache: true,
        failOnError: false
      }),
      new webpack.DefinePlugin({
        __APP_VERSION__: JSON.stringify(version),
        __NO_STRICT_MODE__: JSON.stringify(!!env.nostrict),
        __BUILD_MODE__: JSON.stringify(mode)
      })
    ]
  };
};

export default Webpack;
