'use strict';

const {run, parallel} = require('madrun');

module.exports = {
    'prepublishOnly': () => run('build:dev'),
    'build:way:full': () => 'webpack --config ./.webpack/full/webpack.config.js',
    'build:way:slim': () => 'webpack --config ./.webpack/slim/webpack.config.js',
    'build:dev': () => run('build:way:full', '--mode development', {
        NODE_ENV: 'development',
    }),
    'build': () => parallel('build:way:*', '--mode production', {
        NODE_ENV: 'production',
    }),
    'build:dev:all': () => parallel('build:way:*', '--mode development', {
        NODE_ENV: 'development',
    }),
    'build:dev:slim': () => parallel('build:way:slim', '--mode development', {
        NODE_ENV: 'development',
    }),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -w test -x "${run('test')}"`,
    'lint': () => {
        const names = [
            'bin',
            'lib',
            'madrun.js',
            '.eslintrc.js',
            'test',
            '.webpack',
        ].join(' ');
        
        return `bin/putout.js ${names}`;
    },
    'fix:lint': () => run('lint', '--fix'),
    'lint:progress': () => run('lint', '--fix --f progress'),
    'putout': () => `bin/putout.js bin lib test madrun.js`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

