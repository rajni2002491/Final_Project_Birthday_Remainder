const path = require('path');

module.exports = {
  // Entry point for your application
  entry: './src/index.js',
  
  // Output configuration
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // Add module rules
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /@firebase\/auth/
        ]
      }
    ]
  },

  // Ignore specific warnings in Webpack 5
  ignoreWarnings: [
    {
      module: /@firebase\/auth/,
      message: /Failed to parse source map/
    }
  ],

  // Other configurations
  resolve: {
    extensions: ['.js', '.jsx']
  },

  // Source map configuration
  devtool: 'source-map'
};
