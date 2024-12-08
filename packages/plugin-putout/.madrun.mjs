import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': async () => `nodemon -w lib -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'create:declare': () => 'node scripts/create-declare.mjs',
    'create:declare:types': () => createDeclare({
        name: '@putout/babel',
        path: 'types',
        outputFile: './lib/declare/types.json',
    }),
};

function createDeclare({name, path, outputFile}) {
    return `node scripts/create-declare.mjs ${name} ${path} ${outputFile}`;
}
