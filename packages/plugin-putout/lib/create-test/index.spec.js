import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/create-test', plugin],
    ],
});

test('plugin-putout: create-test: report', (t) => {
    t.reportWithOptions('create-test', `Apply modifications to 'createTest()' options`, {
        add: [
            ['printer', 'putout'],
        ],
    });
    t.end();
});

test('plugin-putout: create-test: no options: no transform: create-test-no-options', (t) => {
    t.noTransform('create-test-no-options');
    t.end();
});

test('plugin-putout: create-test: transform with options', (t) => {
    t.transformWithOptions('create-test', {
        add: [
            ['printer', 'putout'],
            ['plugins', []],
        ],
    });
    t.end();
});

test('plugin-putout: create-test: transform with options: id-id', (t) => {
    t.transformWithOptions('id-id', {
        add: [
            ['printer', 'putout'],
            ['plugins', []],
        ],
    });
    t.end();
});

test('plugin-putout: create-test: transform with options: esm', (t) => {
    t.transformWithOptions('esm', {
        add: [
            ['printer', 'putout'],
        ],
    });
    t.end();
});
