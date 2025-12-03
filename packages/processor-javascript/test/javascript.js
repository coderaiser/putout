import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    processors: ['javascript'],
});

test('putout: processor: javascript', async ({process}) => {
    await process('simple.js', ['variables']);
});

test('putout: processor: javascript: cts', async ({process}) => {
    await process('simple.cts', ['variables']);
});

test('putout: processor: javascript: mts', async ({process}) => {
    await process('simple.mts', ['variables']);
});
