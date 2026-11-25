import {rspack} from '@rspack/core';

export default {
    entry: {
        deepword: './client/index.js',
    },
    plugins: [
        new rspack.EnvironmentPlugin(['NODE_ENV']),
        new rspack.DefinePlugin({
            global: 'globalThis',
        }),
    ],
};
