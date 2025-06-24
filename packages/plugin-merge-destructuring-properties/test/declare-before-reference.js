import {createTest} from '@putout/test';
import * as nodejs from '@putout/plugin-nodejs';
import * as printer from '@putout/plugin-printer';
import * as mergeDestructuringProperties from '../lib/merge-destructuring-properties.js';

const test = createTest(import.meta.url, {
    'declare-before-reference': mergeDestructuringProperties,
});

test('plugin-merge-destructuring-properties: transform: declare-before-reference-no-parent-node', (t) => {
    t.transform('declare-before-reference-no-parent-node', {
        mergeDestructuringProperties,
        'printer/declare': printer.rules.declare,
        'nodejs/declare-after-require': nodejs.rules['declare-after-require'],
    });
    t.end();
});
