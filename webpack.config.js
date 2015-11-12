module.exports = {
  entry: "./client/src/entry.js",
  output: {
    path: "./client/public",
    filename: "main.js"
  },
  module: {
    loaders: [
        { test: /\.css$/, loader: "style!css" }
    ]
  }
};