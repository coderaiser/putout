import {createTest} from '@putout/test';
import * as promises from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'promises/apply-with-resolvers': 'on',
    },
    plugins: [
        ['promises', promises],
    ],
});

test('plugin-promises: transform: apply-with-resolvers: apply-with-resolvers-on', (t) => {
    t.transform('apply-with-resolvers-on');
    t.end();
});
