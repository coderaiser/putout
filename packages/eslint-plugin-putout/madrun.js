'use strict';

const {
    run,
    series,
    parallel,
} = require('madrun');

module.exports = {
    'test': () => `mocha 'rules/**/*.spec.js'`,
    'watch:test': () => `nodemon -w rules -x ${run('test')}`,
    'lint:lib': () => {
        const files = `rules index.js .eslintrc.js`;
        const ignore = `--ignore-pattern='!.eslintrc.js'`;
        
        return `eslint ${files} --rulesdir rules ${ignore}`;
    },
    'lint': () => run('lint:*'),
    'fix:lint': () => run('lint:*', '--fix'),
    'putout': () => `putout index.js rules`,
    'coverage': () => `nyc ${run('test')}`,
};

