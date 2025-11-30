import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['arguments/remove-useless-from-method', plugin],
    ],
});

test('putout: plugin-arguments: remove-useless-from-method: report: method', (t) => {
    t.report('method', `Avoid useless arguments from method 'parseGuard()'`);
    t.end();
});

test('putout: plugin-arguments: remove-useless-from-method: transform: method', (t) => {
    t.transform('method');
    t.end();
});

test('putout: plugin-arguments: remove-useless-from-method: no transform: not-class', (t) => {
    t.noTransform('not-class');
    t.end();
});

test('putout: plugin-arguments: remove-useless-from-method: no report: class-property', (t) => {
    t.noReport('class-property');
    t.end();
});

test('putout: plugin-arguments: remove-useless-from-method: no report: getter', (t) => {
    t.noReport('getter');
    t.end();
});

test('putout: plugin-arguments: remove-useless-from-method: no report: private', (t) => {
    t.noReport('private');
    t.end();
});
