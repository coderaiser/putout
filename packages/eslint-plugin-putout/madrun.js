'use strict';

const {
    run,
    predefined,
} = require('madrun');

const {eslint} = predefined;

module.exports = {
    'test': () => `mocha 'rules/**/*.spec.js'`,
    'watch:test': () => `nodemon -w rules -x ${run('test')}`,
    'lint:lib': () => {
        const rulesdir = 'rules';
        const names = [
            'rules',
            'index.js',
            '.eslintrc.js',
            'madrun.js',
        ];
        
        return eslint({names, rulesdir});
    },
    'lint': () => run('lint:*'),
    'fix:lint': () => run('lint:*', '--fix'),
    'putout': () => `putout index.js rules`,
    'coverage': () => `nyc ${run('test')}`,
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};

