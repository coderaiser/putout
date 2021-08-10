import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => `tape 'test/*.js' '{bin,lib}/**/*.spec.{js,mjs}'`,
    'watch:test': async () => `nodemon -w bin -w lib -w test -x "${await run('test')} -f tap"`,
    'lint': () => `bin/putout.mjs .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:fresh': () => run('fix:lint', '--fresh'),
    'lint:progress': () => run('lint', '--fix'),
    'lint:fresh': () => run('lint', '--fresh'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
};

