'use strict';

const {createTest} = require('@putout/test/processor');
const test = createTest(__dirname, {
    processors: [
        'typescript',
    ],
});

test('putout: processor: typescript', async (t) => {
    await t.comparePlaces('typescript.ts', [{
        message: 'Type \'0\' is not assignable to type \'null\'.',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'type-check (typescript)',
    }]);
});

