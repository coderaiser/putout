import {createTest} from '@putout/test';
import * as destructuring from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['destructuring/remove-useless-arguments', destructuring],
    ],
});

test('putout: plugin-destructuring: remove-useless-arguments: report: second', (t) => {
    t.report('remove-useless-arguments', `Avoid useless argument 'type' of a function 'printAttributes()'`);
    t.end();
});

test('putout: plugin-destructuring: remove-useless-arguments: transform: second', (t) => {
    t.transform('remove-useless-arguments');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-arguments: transform: scope', (t) => {
    t.transform('scope');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-arguments: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-arguments: no report: spread', (t) => {
    t.noReport('spread');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-arguments: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-arguments: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-argumentsg: no transform: fn-as-arg', (t) => {
    t.noTransform('fn-as-arg');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-argumentsg: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-argumentsg: no report: nested', (t) => {
    t.noReport('nested');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-argumentsg: no report: not-object', (t) => {
    t.noReport('not-object');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-argumentsg: no report: deep', (t) => {
    t.noReport('deep');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-argumentsg: no report: dash', (t) => {
    t.noReport('dash');
    t.end();
});
