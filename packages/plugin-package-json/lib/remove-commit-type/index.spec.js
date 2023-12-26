import {createTest} from '@putout/test';
import * as removeCommitType from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['package-json/remove-commit-type', removeCommitType],
    ],
});

test('putout: plugin-package-json: remove-commit-type: report', (t) => {
    t.report('commit-type', `Remove 'commitType=colon' field of 'package.json', it is 'colon' by default`);
    t.end();
});

test('putout: plugin-package-json: remove-commit-type: transform', (t) => {
    t.transform('commit-type');
    t.end();
});

test('putout: plugin-package-json: remove-commit-type: no commit-type', (t) => {
    t.noTransform('no-commit-type');
    t.end();
});
