import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['declare-template-variables', plugin],
    ],
});

test('putout: declare-template-variables: report', (t) => {
    t.report('declare-template-variables', `Declare template variable '__args'`);
    t.end();
});

test('putout: declare-template-variables: transform', (t) => {
    t.transform('declare-template-variables');
    t.end();
});

test('putout: declare-template-variables: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('putout: declare-template-variables: transform: one', (t) => {
    t.transform('one');
    t.end();
});

test('putout: declare-template-variables: transform: arrow-body', (t) => {
    t.transform('arrow-body');
    t.end();
});

test('putout: declare-template-variables: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});

test('putout: declare-template-variables: no report: test', (t) => {
    t.noReport('test');
    t.end();
});
