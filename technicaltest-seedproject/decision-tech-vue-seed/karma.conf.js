var webpackConfig = require('./webpack.config.js');


module.exports = function(config) {
    config.set({
        files: [
            'src/**/*.spec.js'
        ], 
        preprocessors: {
            'src/**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: {
            resolve: webpackConfig.resolve,
            module: webpackConfig.module,
            devtool: 'inline-source-map'
        },
        webpackMiddleware: {
            stats: 'minimal'
        },
        port: 9878,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
            client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
        singleRun: true
    });
};