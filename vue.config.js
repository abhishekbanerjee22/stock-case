module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: "./config"
                }
              }
            }
          ]
        }
      ]
    }
  }
};
