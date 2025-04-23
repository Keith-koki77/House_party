const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  // Automatically infer mode from CLI (development or production)
  const mode = argv.mode || 'production';

  return {
    mode,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./static/frontend"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    optimization: {
      // Only minimize in production
      minimize: mode === 'production',
      // Disable webpack's built-in DefinePlugin injection to avoid conflicts
      nodeEnv: false,  // ([stackoverflow.com](https://stackoverflow.com/questions/75870368/node-env-and-mode-in-webpack-5?utm_source=chatgpt.com))
    },
    plugins: [
      // Explicitly define only NODE_ENV to match the current mode
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode), // ([webpack.js.org](https://webpack.js.org/plugins/define-plugin/?utm_source=chatgpt.com))
      }),
      // (Optional) Use EnvironmentPlugin for fallback values
      // new webpack.EnvironmentPlugin({
      //   NODE_ENV: mode
      // }),
    ],
  };
};
