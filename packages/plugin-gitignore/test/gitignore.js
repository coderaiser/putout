'use strict';

const test = require('@putout/test')(__dirname, {
    gitignore: require('..'),
});

test('plugin-putout: transform', (t) => {
    t.report('gitignore', 'Dot files should be added to .gitignore');
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-putout: transform: all presented', (t) => {
    t.noTransform('gitignore-fix');
    t.end();
});

test('plugin-putout: transform: vim-files', (t) => {
    t.transform('vim-files');
    t.end();
});

test('plugin-putout: transform: options', (t) => {
    t.transformWithOptions('options', {
        dismiss: [
            '.nyc_output',
        ],
    });
    t.end();
});

