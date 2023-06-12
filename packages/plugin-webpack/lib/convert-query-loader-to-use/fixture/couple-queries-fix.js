const rules = [{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        'clean-css-loader',
    ],
}, {
    test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 10000,
            mimetype: 'application/font-woff',
        },
    }],
}];
