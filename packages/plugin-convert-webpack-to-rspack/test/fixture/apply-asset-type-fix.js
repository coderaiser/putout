export default {
    module: {
        rules: [{
            test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                    maxSize: 50_000,
                },
            },
        }],
    },
};
