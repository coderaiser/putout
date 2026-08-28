import webpack from 'webpack';

export default {
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
};
