import {createTest} from '@putout/test';
import * as convertReplaceWith from './index.js';
import {rules} from '../index.js';

const {declare} = rules;

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-replace-with', convertReplaceWith],
    ],
});

test('plugin-putout: convert-replace-with: report: replace-with', (t) => {
    t.report('replace-with', `Use 'operator.replaceWith()' instead of 'path.replaceWith()'`);
    t.end();
});

test('plugin-putout: convert-replace-with: transform: replace-with', (t) => {
    t.transform('replace-with');
    t.end();
});

test('plugin-putout: convert-replace-with: transform: replace-with-exists', (t) => {
    t.transform('replace-with-exists');
    t.end();
});

test('plugin-putout: convert-replace-with: transform: replace-with-multiple-exists', (t) => {
    t.transform('replace-with-multiple-exists');
    t.end();
});

test('plugin-putout: convert-replace-with: transform: insert-after-exists', (t) => {
    t.transform('insert-after-exists');
    t.end();
});

test('plugin-putout: convert-replace-with: transform: putout-declared', (t) => {
    t.transform('putout-declared');
    t.end();
});

test('plugin-putout: convert-replace-with: transform: replace-with-crawl', (t) => {
    t.transform('replace-with-crawl', {
        declare,
    });
    t.end();
});
