'use strict';

const {test} = require('supertape');

const {createPlugin} = require('../create-plugin');
const {lint} = require('./index.js');

test('@putout/eslint: lint: fix', (t) => {
    const plugin = createPlugin({
        include: () => [
            'DebuggerStatement',
        ],
        filter: () => true,
        report: () => `Avoid 'debugger'`,
        fix: () => '',
    });
    
    const [result] = lint('debugger', {
        plugins: [
            ['remove-debugger', plugin],
        ],
    });
    
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/eslint: lint', (t) => {
    const plugin = createPlugin({
        include: () => [
            'DebuggerStatement',
        ],
        filter: () => true,
        report: () => `Avoid 'debugger'`,
        fix: () => '',
    });
    
    const [, messages] = lint('debugger', {
        fix: false,
        plugins: [
            ['remove-debugger', plugin],
        ],
    });
    
    const expected = [{
        message: `Avoid 'debugger'`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'remove-debugger/plugin (eslint)',
    }];
    
    t.deepEqual(messages, expected);
    t.end();
});

