import {createTest} from '@putout/test';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unchanged-zero-declarations', plugin],
    ],
});
