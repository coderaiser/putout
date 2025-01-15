import {createTest} from '@putout/test';
import * as removeNyc from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['package-json/remove-nyc', removeNyc],
    ],
});

test('putout: plugin-package-json: remove-nyc: report', (t) => {
    t.report('nyc', `Remove 'nyc' section of 'package.json', use file '.nycrc.json' instead`);
    t.end();
});

test('putout: plugin-package-json: remove-nyc: transform', (t) => {
    t.transform('nyc');
    t.end();
});

test('putout: plugin-package-json: remove-nyc: no-nyc', (t) => {
    t.noTransform('no-nyc');
    t.end();
});
