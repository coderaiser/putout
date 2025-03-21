import {createTest} from '@putout/test';
import * as renameOperateToOperator from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/rename-operate-to-operator', renameOperateToOperator],
    ],
});

test('plugin-putout: rename-operate-to-operator: report: operate', (t) => {
    t.report('operate', '"operator" should be used instead of "operate"');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: transform: operate', (t) => {
    t.transform('operate');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: no transform: operator', (t) => {
    t.noTransform('operator');
    t.end();
});
