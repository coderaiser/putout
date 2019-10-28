'use strict';

const {
    run,
    predefined,
} = require('madrun');

const {eslint} = predefined;

module.exports = {
    'test': () => `mocha 'rules/**/*.spec.js'`,
    'watch:test': () => `nodemon -w rules -x ${run('test')}`,
    
    'lint': () => {
        const rulesdir = 'rules';
        const names = [
            'rules',
            'index.js',
            '.eslintrc.js',
            '.madrun.js',
        ];
        
        return eslint({names, rulesdir});
    },
    
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => `nyc ${run('test')}`,
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};

