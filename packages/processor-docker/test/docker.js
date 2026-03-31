import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    processors: ['docker'],
    plugins: ['docker'],
});

test('putout: processor: docker', async ({noProcess}) => {
    await noProcess('Dockerfile');
});

test('putout: processor: docker: no places', async ({comparePlaces}) => {
    await comparePlaces('Dockerfile', []);
});

test('putout: processor: docker: process: maintainer', async ({process}) => {
    await process('Dockerfile-maintainer');
});
