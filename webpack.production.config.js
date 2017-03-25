/**
 * Created by yumengya on 2017/3/24
 * 生产环境配置的打包文件
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize:true}),
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
        new HtmlWebpackPlugin({
            title:"react-demo",
            filename:'app.html',
            template:'./build/index.html'      //Load a custom template 
        })
    ],
    entry:{
        app:path.resolve(__dirname,'./src/app.js'),
        vendors:['d3','react']
    },
    output:{
        path: path.resolve(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            {test: /\.less/, loader: 'style-loader!css-loader!less-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets:['es2015','react']
                }
            },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss','.less','jsonp'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};