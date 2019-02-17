'use strict';

const {
    run,
    series,
    parallel,
} = require('madrun');

module.exports = {
    'test': () => `tape 'lib/**/*.spec.js' 'test/*.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    'lint:lib': () => `eslint lib test --ignore-pattern 'fixture'`,
    'lint': () => parallel(['putout', 'lint:*']),
    'fix:lint': () => series(['putout', 'lint:*'], '--fix'),
    'putout': () => `putout lib`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

