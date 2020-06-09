'use strict';

const {run} = require('madrun');

module.exports = {
    'lint:json': () => 'jsonlint -q eslintrc.json',
    'lint:js': () => 'putout .madrun.js',
    'lint': () => run('lint:*'),
    'fix:lint': () => run('lint', '--fix'),
    'prepublishOnly': () => run('lint'),
};

