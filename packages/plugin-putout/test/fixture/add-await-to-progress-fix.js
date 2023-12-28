import {test} from 'supertape';

test('', async (t) => {
    await progress();
    t.end();
});

test('', async ({progress}) => {
    await progress();
});

test('', async ({progress}) => {
    await progress();
});

test('', async (t) => {
    await t.progress();
    t.end();
});

test('packages: rename-file-cjs-to-js: progress', async (t) => {
    await progress('rename-file-cjs-to-js', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'rename-file-cjs-to-js',
    });
    t.end();
});
