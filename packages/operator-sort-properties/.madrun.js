import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'coverage', 'test:dts']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'test:dts': () => 'check-dts test/*.ts',
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
};
