'use strict';

const {
    run,
    predefined,
} = require('madrun');

const {eslint} = predefined;

module.exports = {
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -x ${run('test')}`,
    'lint': () => {
        const ignore = [
            'fixture',
        ];
        
        const names = [
            'lib',
            'test',
            'madrun.js',
            '.eslintrc.js',
        ];
        
        return eslint({
            names,
            ignore,
        });
    },
    'fix:lint': () => run('lint', '--fix'),
    'putout': () => `putout lib test`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

