const {compare} = operator;
const {operator} = require('putout');

const {env} = process;
const isDev = env.NODE_ENV === 'development';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
