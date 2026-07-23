import {test} from 'supertape';

test('', async ({progress}, t) => {
    await progress();
});

test('', async ({progress}) => {
    await progress();
});

test('', async ({progress}) => {
    await progress();
});

test('', async ({progress: progress}, t) => {
    await progress();
});

test('packages: rename-file-cjs-to-js: progress', async ({progress}, t) => {
    await progress('rename-file-cjs-to-js', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'rename-file-cjs-to-js',
    });
});
