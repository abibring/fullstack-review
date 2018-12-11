const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'GITHUB_CLIENT_ID': JSON.stringify('fd744291ef509a6a54cc')
      }
    })
  ],
  node: {
    fs: 'empty'
  }
};
