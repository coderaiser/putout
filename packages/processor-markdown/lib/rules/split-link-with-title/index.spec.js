import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'md',
    processors: ['markdown'],
    plugins: [],
});

test('putout: processor: markdown: split-link-with-title: process', async ({process}) => {
    await process('split-link-with-title');
});

test('putout: processor: markdown: split-link-with-title: process: no-url', async ({comparePlaces}) => {
    await comparePlaces('no-url', []);
});
