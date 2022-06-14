const {operator} = require('putout');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = env.NODE_ENV === 'development';
const {env} = process;
const {compare} = operator;
