const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


const htmlplugin=new HtmlWebPackPlugin({
      template:"./src/index.html",
      filename: "index.html"
});

const cleanHtml=new CleanWebpackPlugin(["dist"]);

module.exports={
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "bundle.js"
    },
    module:{
        rules:[
            {
             test:/\.js$/,
             exclude: /node_modules/,
             loader:"babel-loader"
            },

         {
          test:/\.scss$/,
          use:["style-loader","css-loader","sass-loader"]
         },

         {
          test:/\.css$/,
          use:["style-loader","css-loader"]
         },
         {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                  disable: true,
                },
              },
            ],
          },
        ]
    },
    plugins:[htmlplugin,cleanHtml]
}