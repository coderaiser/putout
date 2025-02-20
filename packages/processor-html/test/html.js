import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'html',
    processors: ['html'],
});

test('putout: processor: html', async ({process}) => {
    await process('html', ['remove-unused-variables']);
});

test('putout: processor: html: css: no fix', async ({comparePlaces}) => {
    await comparePlaces('style', [{
        message: 'Add newline before expression',
        position: {
            column: 1,
            line: 13,
        },
        rule: 'putout/add-newline-before-function-call (eslint)',
    }, {
        message: `'log' is not defined.`,
        position: {
            column: 1,
            line: 13,
        },
        rule: 'no-undef (eslint)',
    }, {
        message: 'Expected a trailing semicolon',
        position: {
            column: 26,
            line: 5,
        },
        rule: '@stylistic/declaration-block-trailing-semicolon (stylelint)',
    }]);
});

test('putout: processor: html: css: fix', async ({process}) => {
    await process('style', ['remove-unused-variables']);
});

test('putout: processor: html: css: template', async ({comparePlaces}) => {
    await comparePlaces('style-template', [{
        message: 'Unknown word template',
        position: {
            column: 8,
            line: 2,
        },
        rule: 'CssSyntaxError (stylelint)',
    }]);
});

test('putout: processor: html: empty script', async ({noProcess}) => {
    await noProcess('empty-script');
});

test('putout: processor: html: svelte', async ({process}) => {
    await process('svelte.svelte', ['apply-destructuring']);
});
