import {createTest} from '@putout/test';
import * as removeUselessMappedTypes from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-mapped-types', removeUselessMappedTypes],
    ],
});

test('plugin-remove-useless-mapped-types: report: mapped-types', (t) => {
    t.report('mapped-types', 'Avoid useless mapped types');
    t.end();
});

test('plugin-remove-useless-mapped-types: transform: mapped-types', (t) => {
    t.transform('mapped-types');
    t.end();
});
