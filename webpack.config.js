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
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|svg|woff(2))$/,
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