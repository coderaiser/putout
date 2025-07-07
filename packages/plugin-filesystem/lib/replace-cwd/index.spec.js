import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    fixCount: 1,
    plugins: [
        ['replace-cwd', plugin],
    ],
});

test('filesystem: replace-cwd: report', (t) => {
    t.reportWithOptions('replace-cwd', `Replace '/home/coderaiser/putout' to '/'`, {
        from: '/home/coderaiser/putout',
        to: '/',
    });
    t.end();
});

test('filesystem: replace-cwd: no report', (t) => {
    t.noReport('replace-cwd');
    t.end();
});

test('filesystem: replace-cwd: transform with options', (t) => {
    t.transformWithOptions('replace-cwd', {
        from: '/home/coderaiser/putout',
        to: '/',
    });
    t.end();
});

test('filesystem: replace-cwd: transform with options: home', (t) => {
    t.transformWithOptions('home', {
        from: '/home/coderaiser/putout',
        to: '/home',
    });
    t.end();
});

test('filesystem: replace-cwd: transform with options: from-root', (t) => {
    t.transformWithOptions('from-root', {
        from: '/',
        to: '/home',
    });
    t.end();
});

test('filesystem: replace-cwd: progress', async ({progressWithOptions}) => {
    const options = {
        from: '/home/coderaiser/putout',
        to: '/home',
    };
    
    await progressWithOptions('home', options, {
        i: 1,
        n: 2,
        percent: '50%',
        rule: 'replace-cwd',
    });
});
