import {createTest} from '@putout/test';
import * as tape from '@putout/plugin-tape';
import {operator} from 'putout';
import * as removeUseless from '../remove-useless/index.js';
import * as reuseDuplicateInit from './index.js';

const {remove} = operator;

const convertTapeToSupertape = tape.rules['convert-tape-to-supertape'];

const declareStub = tape.rules.declare;

const test = createTest(import.meta.url, {
    plugins: [
        ['variables/reuse-duplicate-init', reuseDuplicateInit],
    ],
});

test('putout: plugin-variables: reuse-duplicate-init: report: init', (t) => {
    t.report('init', 'Reuse duplicate init');
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: transform: init', (t) => {
    t.transform('init');
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: no transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: no transform: no-main', (t) => {
    t.noTransform('no-main');
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: no report: rest', (t) => {
    t.noReport('rest');
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: transform: no-node', (t) => {
    t.transform('no-node', {
        'variables/remove-useless': removeUseless,
    });
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: transform: declare-stub', (t) => {
    t.transform('declare-stub', {
        'tape/declare': declareStub,
    });
    t.end();
});

test('putout: plugin-variables: reuse-duplicate-init: transform: overlap', (t) => {
    t.transform('overlap', {
        'tape/convert-tape-to-supertape': convertTapeToSupertape,
        'tape/apply-destructuring': {
            report: () => '',
            replace: () => ({
                'const test = require("supertape")': (vars, path) => {
                    remove(path.scope.bindings.stub.path);
                    return 'const {test, stub} = require("supertape")';
                },
            }),
        },
    });
    t.end();
});
