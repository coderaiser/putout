'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-state-to-hooks': require('.'),
});

test('plugin-react-hooks: convert state tot hooks: report', (t) => {
    t.report('react-hooks', 'hooks should be used instead of this.state');
    t.end();
});

test('plugin-react-hooks: convert state to hooks: transform', (t) => {
    t.transform('react-hooks');
    t.end();
});

