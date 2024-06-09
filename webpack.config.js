const path = require('path');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    entry : './src/main.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './src/game.min.js',
        //publicPath: './dist/',
		assetModuleFilename: './assets/[hash][ext][query]',
		libraryTarget: 'umd'
    },

    devtool: "source-map",

    module: {
        rules: [
            {
				test: /\.ts$/,
				include: [ path.resolve(__dirname, 'src') ],
				use: 'ts-loader'
			},
            {
                test: /\.scss$/i,
				generator: {
				  	filename: './src/[hash][ext][query]'
				},
				use: [
					MiniCSSExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
            },
            {
                test: /\.css$/i,
				generator: {
					filename: './src/[hash][ext][query]'
				},
				use: [
					MiniCSSExtractPlugin.loader,
					"style-loader",
					"css-loader"
				]
            },
			{
				test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				type: 'asset/resource',
				generator: {
				  	filename: './assets/fonts/[hash][ext][query]'
				}
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
				  	filename: './assets/images/[hash][ext][query]'
				}
			}
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css"],
        modules: ['src']
    },

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			hash: true,
			favicon: 'src/assets/images/favicon.ico'
		}),
		new MiniCSSExtractPlugin({
			filename: "./src/style.min.css",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "src/libs", to: "src/libs" },
				{ from: "src/assets/shop", to: "assets/shop" },
				{ from: "src/assets/achievements", to: "assets/achievements" },
				{ from: "src/assets/languages", to: "assets/langs" },
				{ from: "src/assets/sounds", to: "assets/sounds" },
				{ from: "src/assets/updates", to: "assets/updates" },
				{ from: "src/assets/game.json", to: "assets/game.json" },
				{ from: "src/electron-preload.js", to: "preload.js" },
				{ from: "src/electron.js", to: "app.js" }
			]
		})
	],

	optimization: {
		minimize: true,
		minimizer: [ new TerserPlugin() ],
	},

	performance: {
        maxEntrypointSize: 912000,
        maxAssetSize: 912000
	},

	externals: {
		"file-saver": "saveAs",
		"canvas-confetti": "confetti"
	}

};