'use strict';

const {
    run,
    series,
    parallel,
} = require('madrun');

module.exports = {
    'test': () => `mocha 'rules/*.spec.js'`,
    'watch:test': () => `nodemon -w rules -x ${run('test')}`,
    'lint:lib': () => `eslint rules --rulesdir rules`,
    'lint': () => series(['putout', 'lint:*']),
    'fix:lint': () => series(['putout', 'lint:*'], '--fix'),
    'putout': () => `putout rules`,
    'coverage': () => `nyc ${run('test')}`,
};

