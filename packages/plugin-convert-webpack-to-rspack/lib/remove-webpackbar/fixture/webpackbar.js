import webpack from 'webpack';
import WebpackBar from 'webpackbar';

export default {
    plugins: [
        new WebpackBar(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
};
