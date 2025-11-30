import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as removeUseless from '../remove-useless/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['arguments/remove-unused', plugin],
    ],
});

test('putout: plugin-arguments: remove-unused: report: unused', (t) => {
    t.report('unused', `Avoid useless argument: 'member'`);
    t.end();
});

test('putout: plugin-arguments: remove-unused: transform: unused', (t) => {
    t.transform('unused');
    t.end();
});

test('putout: plugin-arguments: remove-unused: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('putout: plugin-arguments: remove-unused: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('putout: plugin-arguments: remove-unused: no report: no-references', (t) => {
    t.noReport('no-references');
    t.end();
});

test('putout: plugin-arguments: remove-unused: no report: destructuring', (t) => {
    t.noReport('destructuring');
    t.end();
});

test('putout: plugin-arguments: remove-unused: no report: no-declaration', (t) => {
    t.noReport('no-declaration');
    t.end();
});

test('putout: plugin-arguments: remove-unused: no report: not-object', (t) => {
    t.noReport('not-object');
    t.end();
});

test('putout: plugin-arguments: remove-unused: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('putout: plugin-arguments: remove-unused: transform: used', (t) => {
    t.transform('used', {
        removeUseless,
    });
    t.end();
});

test('putout: plugin-arguments: remove-unused: transform: anonymous', (t) => {
    t.transform('anonymous');
    t.end();
});
