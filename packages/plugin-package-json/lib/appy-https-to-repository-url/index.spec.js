import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['appy-https-to-repository-url', plugin],
    ],
});

test('package-json: appy-https-to-repository-url: report', (t) => {
    t.report('appy-https-to-repository-url', `Apply 'https' to repository.url`);
    t.end();
});

test('package-json: appy-https-to-repository-url: transform', (t) => {
    t.transform('appy-https-to-repository-url');
    t.end();
});

test('package-json: appy-https-to-repository-url: no report', (t) => {
    t.noReport('repository-not-object');
    t.end();
});
