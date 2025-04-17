import {createTest} from '@putout/test';
import * as applyUtilityTypes from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-utility-types', applyUtilityTypes],
    ],
});

test('plugin-typescript: apply-utility-types: report: mapped-types', (t) => {
    t.report('mapped-types', 'Apply utility types');
    t.end();
});

test('plugin-apply-typescript: apply-utility-types: transform: mapped-types', (t) => {
    t.transform('mapped-types');
    t.end();
});

test('plugin-apply-typescript: apply-utility-types: transform: optional', (t) => {
    t.transform('optional');
    t.end();
});
