import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'coverage', 'test:dts']),
    'test': () => `tape 'test/*.js' '{lib,rules}/**/*.spec.*'`,
    'test:dts': () => 'check-dts test/*.ts',
    'watch:test': async () => `nodemon -w lib -w test -x "${await run('test')}"`,
    'lint': () => `putout . --rulesdir rules`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
};
