import {createTest} from '@putout/test';
import * as nodejs from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'nodejs/apply-privately-required-file': 'on',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: apply-prevately-required-file: report: apply-privately-required-file-on', (t) => {
    t.report('apply-privately-required-file-on', `Apply privately required source: '../is.js' -> '#is'`);
    t.end();
});

test('plugin-nodejs: apply-prevately-required-file: transform: apply-privately-required-file-on', (t) => {
    t.transform('apply-privately-required-file-on');
    t.end();
});
