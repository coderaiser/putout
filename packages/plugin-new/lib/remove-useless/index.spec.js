import {createTest} from '@putout/test';
import * as removeUselessNew from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-new', removeUselessNew],
    ],
});

test('plugin-remove-useless-new: report: new', (t) => {
    t.report('new', `Avoid useless operator 'new'`);
    t.end();
});

test('plugin-remove-useless-new: transform: new', (t) => {
    t.transform('new');
    t.end();
});

test('plugin-remove-useless-new: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-remove-useless-new: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-remove-useless-new: transform: new-new', (t) => {
    t.transform('new-new');
    t.end();
});

test('plugin-remove-useless-new: transform: big-int', (t) => {
    t.transform('big-int');
    t.end();
});

test('plugin-remove-useless-new: transform: reflect', (t) => {
    t.transform('reflect');
    t.end();
});

test('plugin-remove-useless-new: transform: math', (t) => {
    t.transform('math');
    t.end();
});

test('plugin-remove-useless-new: transform: type-error', (t) => {
    t.transform('type-error');
    t.end();
});
