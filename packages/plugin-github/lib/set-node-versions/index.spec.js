import {createTest} from '@putout/test';
import * as setNodeVersion from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['github/set-node-version', setNodeVersion],
    ],
});

test('plugin-github: set node versions: report: github', (t) => {
    t.report('github', 'Use latest version of node');
    t.end();
});

test('plugin-github: set node versions: transform: github', (t) => {
    t.transform('github');
    t.end();
});

test('plugin-github: set node versions: transform with options: options', (t) => {
    t.transformWithOptions('options', {
        versions: [
            '18.x',
            '22.x',
        ],
    });
    t.end();
});

test('plugin-github: set node versions: no transform: no-version', (t) => {
    t.noTransform('no-version');
    t.end();
});

test('plugin-github: set node versions: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-github: set node versions: report: overlap', (t) => {
    t.report('overlap', ['Use latest version of node']);
    t.end();
});

test('plugin-github: set node versions: no report with options: intersects', (t) => {
    t.noReportWithOptions('intersects', {
        versions: ['24.x'],
    });
    t.end();
});
