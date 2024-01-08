import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['minify/inline', plugin],
    ],
});

test('plugin-minify: inline: report', (t) => {
    t.report('inline', `Inline expressions`);
    t.end();
});

test('plugin-minify: inline: transform', (t) => {
    t.transform('inline');
    t.end();
});

test('plugin-minify: inline: no transform: inc', (t) => {
    t.noTransform('inc');
    t.end();
});

test('plugin-minify: inline: no transform: both-expressions', (t) => {
    t.noTransform('both-expressions');
    t.end();
});
