import {createTest} from '@putout/test';
import * as nodejs from '@putout/plugin-nodejs';
import * as esm from '@putout/plugin-esm';
import * as destructuring from '@putout/plugin-destructuring';
import * as replaceWithMultiple from './index.js';
import * as replaceOperateWithOperator from '../replace-operate-with-operator/index.js';

const convertCommonjsToEsmRequire = nodejs.rules['convert-commonjs-to-esm/require'];
const declareImportsFirst = esm.rules['declare-imports-first'];
const mergeDestructuringProperties = destructuring.rules['merge-properties'];

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/replace-with-multiple', replaceWithMultiple],
    ],
});

test('plugin-putout: replace-with-multiple: report', (t) => {
    t.report('replace-with-multiple', `Use 'operator.replaceWithMultiple()' instead of 'path.replaceWithMultiple()'`);
    t.end();
});

test('plugin-putout: replace-with-multiple: transform', (t) => {
    t.transform('replace-with-multiple');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: replaceWithMultiple: replace-with-multiple-exists', (t) => {
    t.transform('replace-with-multiple-exists');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: replaceWith: replace-with-exists', (t) => {
    t.transform('replace-with-exists');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: insertAfter: insert-after-exists', (t) => {
    t.transform('insert-after-exists');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: insertAfter: container-is-falsy', (t) => {
    t.transform('container-is-falsy', {
        replaceOperateWithOperator,
        convertCommonjsToEsmRequire,
        declareImportsFirst,
        mergeDestructuringProperties,
    });
    t.end();
});
