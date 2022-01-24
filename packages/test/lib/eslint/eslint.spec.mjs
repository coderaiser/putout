import {createTest} from './eslint.mjs';
const test = createTest(import.meta.url);

test('test: eslint: export', async ({equal}) => {
    const eslint = await import('./eslint.mjs');
    const testEslint = await import('@putout/test/eslint');
    
    equal(eslint, testEslint);
});

test('test: eslint: process', async ({process}) => {
    await process('operator-linebreak');
});

test('test: eslint: noProcess', async ({noProcess}) => {
    await noProcess('operator-linebreak-fix');
});

test('test: eslint: comparePlaces', async ({comparePlaces}) => {
    await comparePlaces('operator-linebreak', [{
        message: `There should be no line break before or after '='.`,
        position: {
            column: 1,
            line: 2,
        },
        rule: 'operator-linebreak (eslint)',
    }]);
});

test('test: eslint: ts: semi', async ({process}) => {
    await process('semi');
});

