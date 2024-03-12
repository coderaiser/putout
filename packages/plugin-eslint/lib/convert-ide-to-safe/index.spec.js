import {createTest} from '@putout/test';
import * as convertIdeToSafe from './index.js';

const test = createTest(import.meta.url, {
    'eslint/convert-ide-to-safe': convertIdeToSafe,
});

test('putout: plugin-eslint: convert-ide-to-safe: report', (t) => {
    t.report('ide', 'Use "putout/safe" instead of "putout/ide"');
    t.end();
});

test('putout: plugin-eslint: convert-ide-to-safe: transform', (t) => {
    t.transform('ide');
    t.end();
});

test('putout: plugin-eslint: convert-ide-to-safe: no transform: no-extends', (t) => {
    t.noTransform('no-extends');
    t.end();
});
