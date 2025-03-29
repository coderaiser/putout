import {createTest} from '@putout/test';
import * as jest from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/jest', jest],
    ],
});

test('plugin-tape: jest: report', (t) => {
    t.report('jest', `Use 📼 Supertape instead of 🃏Jest`);
    t.end();
});

test('plugin-tape: jest: transform', (t) => {
    t.transform('jest');
    t.end();
});
