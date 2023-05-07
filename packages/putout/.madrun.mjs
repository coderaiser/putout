import {
    run,
    cutEnv,
} from 'madrun';

const testEnv = {
    TERM_PROGRAM: 0,
    TERMINAL_EMULATOR: 0,
};

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => [testEnv, `escover tape 'test/*.{js,mjs}' '{bin,lib}/**/*.spec.{js,mjs}'`],
    'watch:test': async () => [testEnv, `nodemon -w bin -w lib -w test -x "${await cutEnv('test')} -f tap"`],
    'lint': () => `bin/putout.mjs .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:fresh': () => run('fix:lint', '--fresh'),
    'lint:progress': () => run('lint', '--fix'),
    'lint:fresh': () => run('lint', '--fresh'),
    'coverage': async () => [testEnv, `c8 ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};

