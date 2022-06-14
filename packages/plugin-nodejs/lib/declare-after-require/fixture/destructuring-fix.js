const {operator} = require('putout');

const {env} = process;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = env.NODE_ENV === 'development';
const {compare} = operator;
