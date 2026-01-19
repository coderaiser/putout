import * as removeConsole from './fixture/remove-console.js';
import {createTest} from '../lib/test.js';

const test = createTest(import.meta.url, {
    'react-hooks': {
        rules: {
            'remove-console': removeConsole,
        },
    },
});

test('test: rules: reportCode', (t) => {
    t.reportCode('console.log()', `Avoid 'console' call`);
    t.end();
});

test('test: rules: transformCode', (t) => {
    t.transformCode('console.log()', '\n');
    t.end();
});
