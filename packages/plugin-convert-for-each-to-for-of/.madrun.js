'use strict';

const {
    run,
    predefined,
} = require('madrun');

const {putout} = predefined;

module.exports = {
    'test': () => `tape 'test/*.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    
    'lint': () => putout({
        names: [
            'lib',
            'test',
            '.madrun.js',
        ],
    }),
    
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `nyc ${await run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

