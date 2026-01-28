import {createTest} from '@putout/test';
import * as jest from '../lib/jest.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['jest', jest],
    ],
});

test('plugin-jest: report: jest', (t) => {
    t.report('jest', 'Latest Jest API should be used');
    t.end();
});

test('plugin-jest: transform: jest', (t) => {
    t.transform('jest');
    t.end();
});
