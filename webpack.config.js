const {resolve} = require('path')
const webpackValidator = require('webpack-validator')
const {getIfUtils} = require('webpack-config-utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {

    const {ifProd, ifNotProd} = getIfUtils(env)
    const config = webpackValidator({
        context: resolve('src'),
        entry: './bootstrap.js',
        output: {
            filename: 'bundle.js',
            path: resolve('dist'),
            publicPath: '/dist/',
            pathinfo: ifNotProd()
        },
        module: {
            loaders: [
                {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
                {test: /\.css$/, loaders: ['style','css']}

            ]
        },
        plugins: [
            new UglifyJsPlugin({
                beautify: true,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    dead_code: true,
                    unused: true
                },
                comments: false,
                sourceMap: true
            })
        ],
        devtool: ifProd('source-map', 'eval')
    });
    if (env.debug) {
        console.log(config);
        debugger;// eslint-disable-line
    }
    return config;
}
