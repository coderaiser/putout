export default {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'builtin:swc-loader',
            options: {
                jsc: {
                    parser: {
                        syntax: 'ecmascript',
                    },
                },
                env: {
                    targets: 'defaults',
                },
            },
        }],
    },
};
