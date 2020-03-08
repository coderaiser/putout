'use strict';

const test = require('supertape');
const {operator} = require('..');

test('putout: operator: compare', (t) => {
    const result = operator.compare('const a = {}', 'const __ = {}');
    
    t.ok(result, 'should equal');
    t.end();
});

test('putout: operator: compareAll', (t) => {
    const result = operator.compareAll('const a = {}', ['const __ = {}']);
    
    t.ok(result, 'should equal');
    t.end();
});

test('putout: operator: compare: any', (t) => {
    const result = operator.compareAny('const a = {}', [
        'const __ = {}',
        'abc',
    ]);
    
    t.ok(result, 'should equal');
    t.end();
});

