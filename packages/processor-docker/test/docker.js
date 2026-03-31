import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    processors: ['docker'],
});

test('putout: processor: docker', async ({noProcess}) => {
    await noProcess('Dockerfile');
});

test('putout: processor: docker: no places', async ({comparePlaces}) => {
    await comparePlaces('Dockerfile', []);
});
