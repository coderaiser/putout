const rules = [{
    test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
    use: [{
        loader: 'url-loader',

        options: {
            limit: 50_000
        }
    }],
}];
