import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'ts',
    processors: ['typescript'],
});

test('putout: processor: typescript', async ({comparePlaces}) => {
    await comparePlaces('typescript', [{
        message: `Parameter 'a' implicitly has an 'any' type.`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'type-check (typescript)',
    }, {
        message: `Type '0' is not assignable to type 'null'.`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'type-check (typescript)',
    }]);
});
