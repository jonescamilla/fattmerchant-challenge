require('dotenv').config();
// const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      //read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];
    config.node = {
      fs: 'empty',
    };
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
