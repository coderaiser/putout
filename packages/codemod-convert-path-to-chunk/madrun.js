'use strict';

const {
    run
} = require('madrun');

module.exports = {
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -x ${run('test')}`,
    'lint:lib': () => `eslint lib test --ignore-pattern fixture`,
    'lint': () => run(['putout', 'lint:*']),
    'fix:lint': () => run(['putout', 'lint:*'], '--fix'),
    'putout': () => `putout lib test madrun.js`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

