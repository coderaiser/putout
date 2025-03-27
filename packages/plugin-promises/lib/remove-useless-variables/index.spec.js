import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['promises/remove-useless-variables', plugin],
    ],
});

test('promises: remove useless variables: await: report: remove-useless-variables', (t) => {
    t.report('remove-useless-variables', `'Promise.resolve()' has no sense in async function`);
    t.end();
});

test('promises: remove useless variables: await: transform: remove-useless-variables', (t) => {
    t.transform('remove-useless-variables');
    t.end();
});

test('promises: remove useless variables: await: no transform: no-var', (t) => {
    t.noTransform('no-var');
    t.end();
});

test('promises: remove useless variables: await: no transform: no-call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('promises: remove useless variables: await: no transform: no-member', (t) => {
    t.noTransform('no-member');
    t.end();
});

test('promises: remove useless variables: await: no transform: no-resolve', (t) => {
    t.noTransform('no-resolve');
    t.end();
});
