'use strict';

const {run} = require('madrun');

module.exports = {
    'lint:json': () => 'jsonlint -q eslintrc.json',
    'lint:js': () => 'putout .',
    'lint': () => run('lint:*'),
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'prepublishOnly': () => run('lint'),
};

