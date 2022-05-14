import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    processors: [
        'javascript',
    ],
});

test('putout: processor: javascript', async ({process}) => {
    await process('simple.js', ['remove-unused-variables']);
});

