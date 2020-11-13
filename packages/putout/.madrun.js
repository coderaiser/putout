'use strict';

const {run} = require('madrun');

const env = {
    FORCE_COLOR: 3,
    CI: 1,
};

module.exports = {
    'wisdom': () => run(['lint', 'coverage']),
    'test:raw': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'test': () => run('test:raw', '', env),
    
    'watch:test': () => `nodemon -w bin -w lib -w test -x "${run('test')}"`,
    'lint': () => {
        const names = [
            'bin',
            'lib',
            '*.js',
            '*.md',
            'test',
        ].join(' ');
        
        return `bin/putout.js ${names}`;
    },
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:fresh': () => run('fix:lint', '--fresh'),
    'lint:progress': () => run('lint', '--fix'),
    'lint:fresh': () => run('lint', '--fresh'),
    'coverage:raw': () => `nyc ${run('test:raw')}`,
    'coverage': () => run('coverage:raw', '', env),
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

