'use strict';

const {
    run,
    series,
    parallel,
} = require('madrun');

const lintScripts = [
    'putout',
    'lint:*',
];

module.exports = {
    'test': () => `tape 'test/*.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    'lint:lib': () => `eslint lib test --ignore-pattern test/fixture`,
    'lint:bin': () => `eslint --rule 'no-console:0' bin -c .eslintrc.bin`,
    'lint': () => series(lintScripts),
    'fix:lint': () => series(lintScripts, '--fix'),
    'putout': () => `bin/putout.js bin lib test`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

