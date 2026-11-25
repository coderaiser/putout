import {rspack} from '@rspack/core';

const {DefinePlugin} = rspack;

export default {
    entry: './client/index.js',
    plugins: [
        new DefinePlugin({
            global: 'globalThis',
        }),
    ],
};
