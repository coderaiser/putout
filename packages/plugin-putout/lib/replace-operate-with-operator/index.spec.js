import {createTest} from '@putout/test';
import * as replaceOperateWithOperator from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/replace-operate-with-operator', replaceOperateWithOperator],
    ],
});

test('plugin-putout: replace-operate-with-operator: report: operate', (t) => {
    t.report('operate', '"operator" should be used instead of "operate"');
    t.end();
});

test('plugin-putout: replace-operate-with-operator: transform: operate', (t) => {
    t.transform('operate');
    t.end();
});
