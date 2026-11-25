import {rspack} from '@rspack/core';

export default {
    entry: './client/index.js',
    plugins: [
        new rspack.DefinePlugin(config),
        new rspack.DefinePlugin({
            hello: 'world',
        }),
        new rspack.DefinePlugin({
            global: 'globalThis',
        }),
    ],
};
