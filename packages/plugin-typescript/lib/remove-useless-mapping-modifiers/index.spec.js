import {createTest} from '@putout/test';
import * as removeUselessMappingModifiers from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/remove-useless-mapping-modifiers', removeUselessMappingModifiers],
    ],
});

test('plugin-remove-useless-mapping-modifiers: report: mapping-modifiers', (t) => {
    t.report('mapping-modifiers', 'Avoid useless mapping modifiers');
    t.end();
});

test('plugin-remove-useless-mapping-modifiers: transform: mapping-modifiers', (t) => {
    t.transform('mapping-modifiers');
    t.end();
});
