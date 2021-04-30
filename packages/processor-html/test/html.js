'use strict';

const {createTest} = require('@putout/test/processor');

const test = createTest(__dirname, {
    extension: 'html',
    processors: [
        'html',
    ],
});

test('putout: processor: html', async (t) => {
    await t.process('html', ['remove-unused-variables']);
});

test('putout: processor: html: css: no fix', async (t) => {
    await t.comparePlaces('style', [{
        message: '\'log\' is not defined.',
        position: {
            column: 1,
            line: 13,
        },
        rule: 'no-undef (eslint)',
    }, {
        message: 'Expected a trailing semicolon (declaration-block-trailing-semicolon)',
        position: {
            column: 26,
            line: 5,
        },
        rule: 'declaration-block-trailing-semicolon (stylelint)',
    }]);
});

test('putout: processor: html: css: fix', async (t) => {
    await t.process('style', ['remove-unused-variables']);
});

test('putout: processor: html: css: template', async (t) => {
    await t.comparePlaces('style-template', [{
        message: 'Unknown word (CssSyntaxError)',
        position: {
            column: 8,
            line: 2,
        },
        rule: 'CssSyntaxError (stylelint)',
    }]);
});

test('putout: processor: html: empty script', async (t) => {
    await t.noProcess('empty-script');
});

