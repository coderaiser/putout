import {createTest} from '@putout/test';
import * as convertNycToC8 from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-nyc-to-c8', convertNycToC8],
    ],
});

test('madrun: convert-nyc-to-c8: report: coverage', (t) => {
    t.report('coverage', `Use 'c8' instead of 'nyc' to get code coverage`);
    t.end();
});

test('madrun: convert-nyc-to-c8: no report: c8', (t) => {
    t.noReport('c8');
    t.end();
});

test('madrun: convert-nyc-to-c8: no report: no-nyc', (t) => {
    t.noReport('no-nyc');
    t.end();
});

test('madrun: convert-nyc-to-c8: transform: coverage', (t) => {
    t.transform('coverage');
    t.end();
});

test('madrun: convert-nyc-to-c8: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('madrun: convert-nyc-to-c8: no transform: no-coverage', (t) => {
    t.noTransform('no-coverage');
    t.end();
});
