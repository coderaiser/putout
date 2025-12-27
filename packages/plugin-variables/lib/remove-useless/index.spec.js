import {createTest} from '@putout/test';
import * as reuseDuplicateInit from '../reuse-duplicate-init/index.js';
import * as remove from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['variables/remove-useless', remove],
    ],
});

test('putout: plugin-variables: remove-useless: report: require', (t) => {
    t.report('require', `Avoid useless variable declaration with name 'child_process'`);
    t.end();
});

test('putout: plugin-variables: remove-useless: no transform: swap', (t) => {
    t.noTransform('swap');
    t.end();
});

test('putout: plugin-variables: remove-useless: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('putout: plugin-variables: remove-useless: remove: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('putout: plugin-variables: remove-useless: remove: no transform: react', (t) => {
    t.noTransform('react');
    t.end();
});

test('putout: plugin-variables: remove-useless: remove: no transform: if', (t) => {
    t.noTransform('if');
    t.end();
});

test('putout: plugin-variables: remove-useless: remove: no transform: vice-versa', (t) => {
    t.noTransform('vice-versa');
    t.end();
});

test('putout: plugin-variables: remove-useless: transform: reuse-duplicate-init', (t) => {
    t.transform('reuse-duplicate-init', {
        'reuse-duplicate-init': reuseDuplicateInit,
    });
    t.end();
});
