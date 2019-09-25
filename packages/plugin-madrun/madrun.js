'use strict';

const {
    run,
    predefined,
} = require('madrun');

const {putout} = predefined;

module.exports = {
    'prepublishOnly': () => run(['lint:all', 'test']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -x ${run('test')}`,
    'lint': () => 'putout -um',
    'lint:all': () => putout([
        'lib',
        'test',
        'madrun.js',
        '.eslintrc.js',
    ]),
    'fix:lint': () => run('lint', '--fix'),
    'putout': () => `putout lib test`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

