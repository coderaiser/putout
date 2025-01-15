import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-https-to-repository-url', plugin],
    ],
});

test('package-json: apply-https-to-repository-url: report', (t) => {
    t.report('apply-https-to-repository-url', `Apply 'https' to repository.url`);
    t.end();
});

test('package-json: apply-https-to-repository-url: transform', (t) => {
    t.transform('apply-https-to-repository-url');
    t.end();
});

test('package-json: apply-https-to-repository-url: no report: repository-not-object', (t) => {
    t.noReport('repository-not-object');
    t.end();
});
