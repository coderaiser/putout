import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['find-keys', plugin],
    ],
});

test('putout: package-json: remove-exports-with-missing-files: find-keys: report', (t) => {
    t.report('find-keys', `./parse-options -> ./lib/parse-options/index.js`);
    t.end();
});

test('putout: package-json: remove-exports-with-missing-files: find-keys: transform', (t) => {
    t.transform('find-keys');
    t.end();
});

test('putout: package-json: remove-exports-with-missing-files: find-keys: no report: no exports', (t) => {
    t.noReport('no-exports');
    t.end();
});

test('putout: package-json: remove-exports-with-missing-files: find-keys: no report: not-object', (t) => {
    t.noReport('not-object');
    t.end();
});
