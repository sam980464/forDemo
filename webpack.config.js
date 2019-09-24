const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const configrules = require('./wconfig-rules.js');

const gitHashCommand = 'rev-parse --short HEAD';
const gitRevisionPlugin = new GitRevisionPlugin({ branch: true, commithashCommand: gitHashCommand, versionCommand: 'describe --tags $(git rev-list --tags --max-count=1)' });
const appVersion = JSON.stringify(gitRevisionPlugin.version());
const appGitBranch = JSON.stringify(gitRevisionPlugin.branch());
const appGitCommit = JSON.stringify(gitRevisionPlugin.commithash());

const distConfig = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${gitRevisionPlugin.version()}.js`,
  },
  module: {
    rules: configrules,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new HtmlWebpackPlugin({ template: './public/index-modal.html', filename: 'index-modal.html' }),
    new webpack.DefinePlugin({
      VERSION: appVersion,
      BRANCH: appGitBranch,
      COMMIT: appGitCommit,
    }),
    new webpack.BannerPlugin(`savi-primer-engine version: ${appVersion}\n branch: ${appGitBranch}\n commit: ${appGitCommit}`),
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
  ],
};

const libConfig = {
  entry: './src/lib.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
    libraryTarget: 'window',
    library: 'saviPrimerEngine',
  },
  module: {
    rules: configrules,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.BannerPlugin(`savi-primer-engine ${appVersion}`),
  ],
};

const npmLibConfig = {
  entry: './src/lib.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'main.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: configrules,
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
  ],
};
module.exports = [distConfig, libConfig, npmLibConfig];
