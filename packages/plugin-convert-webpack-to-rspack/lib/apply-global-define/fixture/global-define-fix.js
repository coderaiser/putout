import {rspack} from '@rspack/core';

export default {
    entry: {
        edward: './client/edward.js',
    },
    output: {
        filename: '[name].js',
    },
    plugins: [new rspack.DefinePlugin({
            global: 'globalThis',
        })],
};
