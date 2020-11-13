'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => `mocha 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w rules -x ${run('test')}`,
    'lint': () => 'putout *.md *.json *.js lib/**/{*.js,*.json,*.md}',
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => `nyc ${run('test')}`,
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};

