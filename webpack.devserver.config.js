const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const webpack = require('webpack');
const path = require('path');
const configrules = require('./wconfig-rules.js');

const gitHashCommand = 'rev-parse --short HEAD';
const gitRevisionPlugin = new GitRevisionPlugin({ commithashCommand: gitHashCommand });
const appVersion = JSON.stringify(gitRevisionPlugin.version());
const appGitBranch = JSON.stringify(gitRevisionPlugin.branch());
const appGitCommit = JSON.stringify(gitRevisionPlugin.commithash());

const serverConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: configrules,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new GitRevisionPlugin({
      branch: true,
      commithashCommand: gitHashCommand,
    }),
    new webpack.DefinePlugin({
      VERSION: appVersion,
      COMMIT: appGitCommit,
      BRANCH: appGitBranch,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'sourceSansPro',
          entry: {
            path: 'https://savi-cdn.macmillantech.com/fonts/SourceSansPro/sourceSansPro.css',
            type: 'css',
          },
        },
      ],
    }),
    new webpack.BannerPlugin(`version: ${appVersion}\n branch: ${appGitBranch}\n commit: ${appGitCommit}`),
  ],
};

const libConfig = {
  entry: './src/lib.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'lib.js',
    libraryTarget: 'window',
    library: 'saviPrimerEngine',
  },
  module: {
    rules: configrules,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.BannerPlugin(`__APPNAME__ ${appVersion}`),
  ],
};

module.exports = [serverConfig, libConfig];
