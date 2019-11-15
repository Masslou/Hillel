const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    entry: './src/script/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new MiniCssExtractPlugin({filename: "./src/assets/style.css"}),

    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        compress: true,
        port: 9000
    },

    devtool: "source-map"

};

