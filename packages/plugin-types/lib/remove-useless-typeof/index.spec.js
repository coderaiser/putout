import {createTest} from '@putout/test';
import * as removeUselessTypeof from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-typeof', removeUselessTypeof],
    ],
});

test('plugin-remove-useless-typeof: report: typeof-typeof', (t) => {
    t.report('typeof-typeof', `Avoid useless 'typeof'`);
    t.end();
});

test('plugin-remove-useless-typeof: transform: typeof-typeof', (t) => {
    t.transform('typeof-typeof');
    t.end();
});
