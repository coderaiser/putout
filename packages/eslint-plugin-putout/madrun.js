'use strict';

const {
    run,
    series,
    parallel,
} = require('madrun');

module.exports = {
    'test': () => `mocha 'rules/**/*.spec.js'`,
    'watch:test': () => `nodemon -w rules -x ${run('test')}`,
    'lint:lib': () => `eslint rules index.js --rulesdir rules`,
    'lint': () => series(['putout', 'lint:*']),
    'fix:lint': () => series(['putout', 'lint:*'], '--fix'),
    'putout': () => `putout index.js rules`,
    'coverage': () => `nyc ${run('test')}`,
};

