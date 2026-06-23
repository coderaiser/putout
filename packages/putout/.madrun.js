import {run, cutEnv} from 'madrun';

const testEnv = {
    TERM_PROGRAM: 0,
    TERMINAL_EMULATOR: 0,
};

export default {
    'wisdom': () => run(['lint', 'coverage', 'test:dts']),
    'test': () => [testEnv, `tape 'test/*.js' '{bin,lib}/**/*.spec.js' 'scripts/*.spec.js'`],
    'test:dts': () => 'check-dts test/*.ts',
    'watch:test': async () => [testEnv, `nodemon -w bin -w lib -w test -x "${await cutEnv('test')} -f tap"`],
    'scheme': () => 'scripts/bin/scheme.js',
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:fresh': () => run('fix:lint', '--fresh'),
    'lint:progress': () => run('lint', '--fix'),
    'lint:fresh': () => run('lint', '--fresh'),
    'coverage': async () => [testEnv, `c8 ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};
