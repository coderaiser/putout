import {createTest} from '@putout/test';
import * as optimize from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['regexp/apply-starts-with', optimize],
    ],
});

test('putout: plugin-regexp: apply-starts-with: report: apply-starts-with', (t) => {
    t.report('apply-starts-with', `Use '.startsWith()' instead of '.test()'`);
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: transform: apply-starts-with', (t) => {
    t.transform('apply-starts-with');
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: transform: slash', (t) => {
    t.transform('slash');
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: transform: dot', (t) => {
    t.transform('dot');
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: transform: round-braces', (t) => {
    t.transform('round-braces');
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: report: constructor', (t) => {
    t.report('constructor', [
        `Use '.startsWith()' instead of '.test()'`,
        `Use '.startsWith()' instead of '.test()'`,
    ]);
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: no report: constructor-star', (t) => {
    t.noReport('constructor-star');
    t.end();
});

test('putout: plugin-regexp: apply-starts-with: transform: constructor-string', (t) => {
    t.transform('constructor-string');
    t.end();
});
