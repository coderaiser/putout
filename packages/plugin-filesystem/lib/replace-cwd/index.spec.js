'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
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

test('filesystem: replace-cwd: transform', (t) => {
    t.transformWithOptions('replace-cwd', {
        from: '/home/coderaiser/putout',
        to: '/',
    });
    t.end();
});

test('filesystem: replace-cwd: transform: home', (t) => {
    t.transformWithOptions('home', {
        from: '/home/coderaiser/putout',
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
