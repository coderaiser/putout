const rules = [{
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'clean-css-loader'],
}, {
    test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
    loader: 'url-loader?limit=50000',
}];
