import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'html',
    processors: ['html'],
});

test('putout: processor: html', async ({process}) => {
    await process('html', [
        ['remove-button', {
            report: () => '',
            replace: () => ({
                '<button>__a</button>': '',
            }),
        }],
    ]);
});

test('putout: processor: html: class', async ({process}) => {
    await process('class', [
        ['remove-button', {
            report: () => '',
            replace: () => ({
                '<button>__a</button>': '',
            }),
        }],
    ]);
});

test('putout: processor: html: semicolon', async ({process}) => {
    await process('no-semicolon');
});
