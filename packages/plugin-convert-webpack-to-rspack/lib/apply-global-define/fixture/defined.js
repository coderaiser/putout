import {rspack} from '@rspack/core';

export default {
    entry: './client/index.js',
    plugins: [
        new rspack.DefinePlugin({
            global: 'globalThis',
        }),
    ],
};
