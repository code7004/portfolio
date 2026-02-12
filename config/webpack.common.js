import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import webpack from "webpack";

const Webpack = (env, argv, custom) => {
  const { appName, version, minify } = custom;
  console.log(appName, "build version : ", version, JSON.stringify(argv), JSON.stringify(env), JSON.stringify(custom));
  return {
    devServer: {
      port: 3000,
      historyApiFallback: true,
      proxy: [
        {
          context: ["/api"],
          target: "https://frontend-assignment-api.mathflat.com",
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
      })
    ]
  };
};

export default Webpack;
