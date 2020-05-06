'use strict';

const {run} = require('madrun');

module.exports = {
    'wisdom': () => run(['lint', 'test']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w bin -w lib -w test -x "${run('test')}"`,
    'lint': () => {
        const names = [
            'bin',
            'lib',
            '.madrun.js',
            '.eslintrc.js',
            'test',
        ].join(' ');
        
        return `bin/putout.js ${names} --f progress --cache`;
    },
    
    'fix:lint': () => run('lint', '--fix'),
    'lint:progress': () => run('lint', '--fix --f progress'),
    'lint:cache': () => run('lint', '--cache'),
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

