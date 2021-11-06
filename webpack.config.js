// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const cssToFile = require('mini-css-extract-plugin');

// PATHES
const path = require('path');
const publicPath = path.join(__dirname, 'public');

module.exports = {
    entry: [
        './resources/scripts/main.ts',
        './resources/styles/main.sass'
    ],
    output: {
        path: publicPath,
        filename: '[name].[contenthash].js',
        publicPath,
    },
    resolve: {
        alias: {
            fonts: path.join(__dirname, '/resources/fonts')
        },
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.join(__dirname, '/resources/tsconfig.json')
                }
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    // fallback to style-loader in development
                    cssToFile.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.woff$/,
                loader: 'file-loader',
                options: {
                    publicPath: '/fonts/',
                    outputPath: 'fonts',
                    name: '[name].[hash:16].[ext]',
                    esModule: false,
                },
            },
        ]
    },
    plugins: [
        new WebpackManifestPlugin({
            basePath: '',
            publicPath: '',
        }),
        new CopyPlugin({
            patterns: [{
                from: 'resources/images',
                to: 'images/[path][name].[contenthash][ext]',
                globOptions: {
                    ignore: ['**/.DS_Store'],
                },
            }]
        }),
        new CleanWebpackPlugin(),
        new cssToFile({
            filename: '[name].[contenthash].css'
        }),
    ],
};
