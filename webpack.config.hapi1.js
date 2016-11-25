var webpack = require('webpack');


var loaders = [
  {
    test: /\.ts$/,
    loader: "ts-loader",
    exclude: /node_modules/,
  },
  {
    test: /\.json$/,
    loader: "json-loader",
    exclude: /secret\-key/,
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    query: {
      presets: ['latest'],
      plugins: []
    },
    // exclude: /hapi1/,
  }
];


module.exports = [
  {
    name: "hapi1",
    entry: "./hapi1/main.ts",
    target: "node",
    resolve: {
      extensions: ['.js', '.ts']
    },
    externals: [
      {
        '../../secret-key/app.secret.json': '../secret-key/app.secret.json',
        '../../secret-key/serviceAccountKey.json': '../secret-key/serviceAccountKey.json',
        'firebase-admin': 'firebase-admin',
      }
    ],
    output: {
      filename: './hapi1/main.js',
      libraryTarget: "commonjs"
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false
        }
      }),
    ],
    module: {
      loaders: loaders
    }
  }
];
