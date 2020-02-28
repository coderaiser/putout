'use strict';

const {run, parallel} = require('madrun');

module.exports = {
    'wisdom': () => run(['lint', 'test', 'build:dev:all']),
    'build:way:full': () => 'webpack --config ./.webpack/full/webpack.config.js',
    'build:way:slim': () => 'webpack --config ./.webpack/slim/webpack.config.js',
    
    'build:dev': () => run('build:way:full', '--mode development', {
        NODE_ENV: 'development',
    }),
    
    'build': () => parallel('build:way:*', '--mode production', {
        NODE_ENV: 'production',
    }),
    
    'build:dev:all': () => run('build:way:*', '--mode development', {
        NODE_ENV: 'development',
    }),
    
    'build:dev:slim': () => parallel('build:way:slim', '--mode development', {
        NODE_ENV: 'development',
    }),
    
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w bin -w lib -w test -x "${run('test')}"`,
    
    'lint': () => {
        const names = [
            'bin',
            'lib',
            '.madrun.js',
            '.eslintrc.js',
            'test',
            '.webpack',
        ].join(' ');
        
        return `bin/putout.js ${names} --f progress --cache`;
    },
    
    'fix:lint': () => run('lint', '--fix'),
    'lint:progress': () => run('lint', '--fix --f progress'),
    'lint:cache': () => run('lint', '--cache'),
    'lint:p': () => run('lint:progress'),
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

