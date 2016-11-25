const webpack = require('webpack');


const loaders = [
  {
    test: /\.ts$/,
    loader: "ts-loader",
    exclude: /node_modules/,
  },
  {
    test: /\.json$/,
    loader: "json-loader",
    exclude: /^\.\/secret\-key/,
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    query: {
      presets: ['latest'],
      plugins: []
    },
  }
];


module.exports = [
  {
    name: 'server bundle',
    target: 'node',
    entry: {
      'hapi1': './hapi1/index.ts',
      'express1': './express1/index.ts',
      'lodash': './lodash/index.ts',
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: "commonjs2"
    },    
    resolve: {
      extensions: ['.js', '.ts']
    },
    externals: [
      {
        '../../secret-key/app.secret.json': '../secret-key/app.secret.json',
        '../../secret-key/serviceAccountKey.json': '../secret-key/serviceAccountKey.json',
        'firebase': 'firebase',
        'firebase-admin': 'firebase-admin',
      }
    ],    
    // plugins: [
    //   new webpack.optimize.UglifyJsPlugin({
    //     mangle: true,
    //     compress: {
    //       warnings: false
    //     }
    //   }),
    // ],
    module: {
      loaders: loaders
    },
    // devtool: 'source-map',
  }
];
