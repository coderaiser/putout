'use strict';

const {run} = require('madrun');

module.exports = {
    'wisdom': () => run(['lint', 'test']),
    'test': () => `FORCE_COLOR=3 CI=1 tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w bin -w lib -w test -x "${run('test')}"`,
    'lint': () => {
        const names = [
            'bin',
            'lib',
            '.madrun.js',
            '.eslintrc.js',
            'test',
        ].join(' ');
        
        return `bin/putout.js ${names}`;
    },
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:fresh': () => run('fix:lint', '--fresh'),
    'lint:progress': () => run('lint', '--fix'),
    'lint:fresh': () => run('lint', '--fresh'),
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

