import {run} from 'madrun';

export default {
    'test:base': () => `tape 'test/*.js'`,
    
    'test': async () => await run('test:base', '', {
        PUTOUT_PROGRESS_BAR: 0,
        TEST: 1,
    }),
    
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage:base': async () => `c8 ${await run('test:base')}`,
    
    'coverage': async () => await run('coverage:base', '', {
        PUTOUT_PROGRESS_BAR: 0,
        TEST: 1,
    }),
    
    'report': () => 'c8 report --reporter=lcov',
};

