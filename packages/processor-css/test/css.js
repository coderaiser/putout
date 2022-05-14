import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'css',
    processors: [
        'css',
    ],
});

test('putout: processor: css', async ({process}) => {
    await process('style');
});

test('putout: processor: css: places', async ({comparePlaces}) => {
    await comparePlaces('style', [{
        message: 'Expected indentation of 4 spaces (indentation)',
        position: {
            column: 1,
            line: 2,
        },
        rule: 'indentation (stylelint)',
    }]);
});

test('putout: processor: css: template', async ({comparePlaces}) => {
    await comparePlaces('template', [{
        message: 'Unknown word (CssSyntaxError)',
        position: {
            column: 4,
            line: 1,
        },
        rule: 'CssSyntaxError (stylelint)',
    }]);
});

