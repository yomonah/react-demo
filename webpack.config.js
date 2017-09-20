/**
 * Created by yumengya on 2017/3/4
 * 开发环境配置的打包文件
 */
var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');

module.exports = {
    //插件项
    plugins: [
    //commonsPlugin,
    new webpack.NoErrorsPlugin()
  ],
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],
    //页面入口文件配置
    //entry: {mian : './src/app.js'},
    entry:[
        'webpack/hot/dev-server',
        path.resolve(__dirname,'./src/app.js'),
        ],
    //入口文件输出配置
    //output: {path: __dirname+'_build_', filename: '[name].js'}
    output:{
        path: path.resolve(__dirname,'./build'),
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            //LESS文件先通过less-load处理成css，然后再通过css-loader加载成css模块，最后由style-loader加载器对其做最后的处理，
            // 从而运行时可以通过style标签将其应用到最终的浏览器环境
            {test: /\.less/, loader: 'style-loader!css-loader!less-loader'},
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理 jsx-loader可以添加?harmony参数使其支持ES6语法
            { test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets:['es2015','react']
                } //备注：es2015用于支持ES6语法，react用于解决render()报错的问题
            },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        //root: 'E:/github/flux-example/app', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss','.less','jsonp'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    },
    devServer:{
        inline:true,
        port:3000,
        // host:'192.168.199.237'
    }
};