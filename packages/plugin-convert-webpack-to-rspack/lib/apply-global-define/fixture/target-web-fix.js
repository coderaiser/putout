import {rspack} from '@rspack/core';

export default {
    target: ['web'],
    entry: './client/index.js',
    plugins: [new rspack.DefinePlugin({
            global: 'globalThis',
        })],
};
