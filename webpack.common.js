module.exports = {
  entry: {
    app: "./src/index.js",
  },
  module: {
    rules: [
      // component
      {
        test: /\.css$/i,
        exclude: /styles/,
        use: ["style-loader", "css-loader"],
      },
      // global style
      {
        test: /\.css$/i,
        include: /styles/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
