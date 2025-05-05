import {createTest} from '@putout/test';
import * as removeUselessTemplates from '../lib/remove-useless-templates.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-templates', removeUselessTemplates],
    ],
});

test('plugin-remove-useless-templates: report: template', (t) => {
    t.report('template', 'Avoid using single-expression templates');
    t.end();
});

test('plugin-remove-useless-templates: transform: template', (t) => {
    t.transform('template');
    t.end();
});
