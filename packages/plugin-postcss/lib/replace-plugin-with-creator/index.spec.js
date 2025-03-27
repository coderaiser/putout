import {createTest} from '@putout/test';
import * as replacePluginWithCreator from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['postcss/replace-plugin-with-creator', replacePluginWithCreator],
    ],
});

test('plugin-postcss: report: export', (t) => {
    t.report('export', `creator should be used instead of plugin`);
    t.end();
});

test('plugin-postcss: transform: export', (t) => {
    t.transform('export');
    t.end();
});
