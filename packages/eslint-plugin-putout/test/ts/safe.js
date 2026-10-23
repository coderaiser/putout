import {createTest} from '@putout/test/eslint';
import {safe} from '#eslint-plugin-putout';

const test = createTest(import.meta.url, safe);

test('eslint-plugin-putout: safe: no-unused-vars', async ({comparePlaces}) => {
    await comparePlaces('no-unused-vars', []);
});
