module.exports = {
  entry: "./client/src/entry.js",
  output: {
    path: "./client/public",
    filename: "main.js"
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: "style!css!autoprefixer?{browsers:['last 2 version', '> 1%']}!stylus" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?cacheDirectory=true"] }
    ]
  }
};