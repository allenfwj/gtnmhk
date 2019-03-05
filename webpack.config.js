let webpack = require('webpack');
let path = require('path');
let htmlWebpackPlugin=require('html-webpack-plugin');//打包html
let ExtractTextPlugin = require("extract-text-webpack-plugin");//打包css



module.exports={
    entry:{
		public:'./src/js/public.js'
        ,index:'./src/js/index.js'
        
    },
    output:{
        path:path.resolve(__dirname,'dist/'),
        filename:'js/[name].min.js?v=[hash:8]'
    },
    plugins:[
        new htmlWebpackPlugin({ 
            template:'./src/page/index.ejs',
            filename:'./index.html',
            chunks:['public','index','indexIndex']
        }),
        // new htmlWebpackPlugin(getHtmlConfig('index','public,index')),
        // new htmlWebpackPlugin(getHtmlConfig('about','public,index,about')),
        // new htmlWebpackPlugin(getHtmlConfig('product_list','public,index,product_list')),
        new ExtractTextPlugin({//打包css
            filename:'css/style.css?v=[hash:8]',
            allChunks:true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
        
    ],
    module:{
        rules:[
            {//打包css
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader',
                    publicPath:'../'
                })
            },{
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {

                    }
                }
            },{
                test:/\.(png|jpg)/ ,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:1000,//图片的大小，1000B之内会被转码base64，如果超过则不被转码
                        // outputPath:'images/',
                        name:'images/[name]_[hash:8].[ext]'//图片路径
                        // publicPath:'./'//默认相对路径
                    }
                }]
             },{
                test:/\.(gif)/ ,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:1000,//图片的大小，1000B之内会被转码base64，如果超过则不被转码
                        // outputPath:'images/',
                        name:'exp_images/[hash].[ext]'//图片路径
                        // publicPath:'./'//默认相对路径
                    }
                }]
             },{
                test:/\.(woff|svg|eot|ttf)/ ,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'font/[name].[ext]',//文件路径
                        publicPath:'../'//默认相对路径
                    }
                }]
             }
        ]
    },
    devServer:{
        host: 'localhost', //可选，ip
        port: 3000, //可选，端口
        contentBase:path.resolve(__dirname,'dist'), //可选，基本目录结构
        compress: true, //可选，压缩
        // openPage:'about.html'
    }


}