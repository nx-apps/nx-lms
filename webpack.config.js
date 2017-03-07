module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        filename: './public/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'babel-loader!wc-loader',
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
        ]
    },
    watch: true,
    devtool: "inline-source-map"
};