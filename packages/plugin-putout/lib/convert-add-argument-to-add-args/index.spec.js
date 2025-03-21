import {createTest} from '@putout/test';
import * as convertAddArgumentToAddArgs from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-add-argument-to-add-args', convertAddArgumentToAddArgs],
    ],
});

test('plugin-putout: convert-add-argument-to-add-args: report: add-argument', (t) => {
    t.report('add-argument', 'Use addArgs instead of addArgument');
    t.end();
});

test('plugin-putout: convert-add-argument-to-add-args: transform: add-argument', (t) => {
    t.transform('add-argument');
    t.end();
});
