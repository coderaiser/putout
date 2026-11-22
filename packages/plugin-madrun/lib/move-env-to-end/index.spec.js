import {createTest} from '@putout/test';
import * as moveEnvToEnd from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-env-to-end', moveEnvToEnd],
    ],
});

test('madrun: move-env-to-end: report: env', (t) => {
    t.report('env', `Pass env object directly only as the last argument`);
    t.end();
});

test('madrun: move-env-to-end: transform: env', (t) => {
    t.transform('env');
    t.end();
});

test('madrun: move-env-to-end: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('madrun: move-env-to-end: no transform: variable', (t) => {
    t.noTransform('variable');
    t.end();
});

test('madrun: move-env-to-end: no transform: last', (t) => {
    t.noTransform('last');
    t.end();
});
