'use strict';

const {run} = require('madrun');

const lintScripts = [
    'putout',
    'lint:*',
];

module.exports = {
    'prepublishOnly': () => run('build:dev'),
    'build:base': () => 'webpack --config ./.webpack/webpack.config.js',
    'build': () => run('build:base', '--mode production'),
    'build:dev': () => run('build:base', '--mode development'),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    'lint:lib': () => `eslint lib`,
    'lint:test': () => `eslint madrun.js test --ignore-pattern test/fixture`,
    'lint:bin': () => `eslint --rule 'no-console:0' bin -c .eslintrc.bin`,
    'lint': () => run(lintScripts),
    'fix:lint': () => run(lintScripts, '--fix'),
    'putout': () => `bin/putout.js bin lib test madrun.js`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

