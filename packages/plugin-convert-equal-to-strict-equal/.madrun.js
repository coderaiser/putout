'use strict';

const {
    run,
    predefined,
} = require('madrun');

const {putout} = predefined;

module.exports = {
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    
    'lint': () => putout({
        names: [
            'lib',
            'test',
            '.madrun.js',
        ],
    }),
    
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

