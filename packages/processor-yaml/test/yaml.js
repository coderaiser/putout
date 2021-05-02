'use strict';

const {createTest} = require('@putout/test/processor');
const test = createTest(__dirname, {
    processors: [
        'yaml',
    ],
});

test('putout: processor: yaml', async (t) => {
    await t.process('travis.yml', ['travis/disable-cache']);
});

test('putout: processor: yaml: duplicate', async (t) => {
    await t.comparePlaces('duplicate.yml', [{
        position: {
            column: 1,
            line: 4,
        },
        message: 'Duplicated mapping key (4:3)',
        rule: 'duplicated-mapping-key (yaml)',
    }]);
});

test('putout: processor: yaml: duplicate: file content', async (t) => {
    await t.noProcess('duplicate.yml');
});
