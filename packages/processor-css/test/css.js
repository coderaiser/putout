import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'css',
    processors: ['css'],
});

test('putout: processor: css', async ({process}) => {
    await process('style');
});

test('putout: processor: css: places', async ({comparePlaces}) => {
    await comparePlaces('style', [{
        message: 'Expected indentation of 8 spaces',
        position: {
            column: 5,
            line: 3,
        },
        rule: '@stylistic/indentation (stylelint)',
    }]);
});

test('putout: processor: css: align: no warnings for align', async ({comparePlaces}) => {
    await comparePlaces('align', []);
});

test('putout: processor: css: selector-class-pattern', async ({comparePlaces}) => {
    await comparePlaces('selector-class-pattern', []);
});

test('putout: processor: css: comparePlaces: url-quotes', async ({comparePlaces}) => {
    await comparePlaces('url-quotes', []);
});

test('putout: processor: css: template', async ({comparePlaces}) => {
    await comparePlaces('template', [{
        message: 'Unknown word',
        position: {
            column: 4,
            line: 1,
        },
        rule: 'CssSyntaxError (stylelint)',
    }]);
});

test('putout: processor: css: process: template', async ({noProcess}) => {
    await noProcess('template');
});
