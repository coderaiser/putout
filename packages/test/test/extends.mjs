import * as removeUnusedVariables from '@putout/plugin-remove-unused-variables';
import {createTest} from '../lib/test.mjs';

const plugins = {
    removeUnusedVariables,
};

const test = createTest(import.meta.url, plugins, {
    render: (operator) => () => operator.equal(1, 1),
});

test('test: extends', (t) => {
    t.render(1, 1);
    t.end();
});
