var webpackConfig = require('./webpack.config.js');


module.exports = function(config) {
    config.set({
        files: [
			'src/main.js' ,
			'test.webpack.js' ,			
            'src/**/*.spec.js'
        ], 
        preprocessors: {			
			'src/main.js' : ['webpack', 'sourcemap'],
			'test.webpack.js' : ['webpack', 'sourcemap'],
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
        singleRun: true
    });
};