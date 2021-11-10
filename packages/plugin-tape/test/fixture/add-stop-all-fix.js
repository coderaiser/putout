import {test} from 'supertape';
test('test: remove', async (t) => {
    const read = await reImport('./read.js');

    mockImport('fs/promises', {
        readFile,
    });

    stopAll();

    t.equal(result, expected);
    t.end();
});

