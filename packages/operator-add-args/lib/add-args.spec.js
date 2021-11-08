'use strict';

const test = require('supertape');
const putout = require('putout');
const montag = require('montag');

const {addArgs} = require('./add-args.js');

test('putout: operator: add-argument', (t) => {
    const args = {
        compare: ['{compare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', () => {
            compare(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', (
            {
                compare
            }
        ) => {
            compare(a, b);
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-argument: a couple patterns', (t) => {
    const args = {
        compare: ['{compare}', [
            'test("__a", (__args) => __body)',
            'test.only("__a", (__args) => __body)',
        ]],
    };
    
    const source = montag`
        test('', () => {
            compare(a, b);
        });
        
        test.only('', () => {
            compare(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', (
            {
                compare
            }
        ) => {
            compare(a, b);
        });
        
        test.only('', (
            {
                compare
            }
        ) => {
            compare(a, b);
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-argument: when argument already exist', (t) => {
    const args = {
        compare: ['{compare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', ({compare, comparePlaces}) => {
            compare(a, b);
            comparePlaces(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', ({compare, comparePlaces}) => {
            compare(a, b);
            comparePlaces(a, b);
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-argument: rename', (t) => {
    const args = {
        superCompare: ['{compare: superCompare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', ({}) => {
            superCompare(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', ({
            compare: superCompare
        }) => {
            superCompare(a, b);
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-argument: identifier', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', () => {
            t.end();
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', t => {
            t.end();
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-argument: options', (t) => {
    const args = {};
    
    const source = montag`
        test('', () => {
            t.end();
        });
    `;
    
    const {code} = putout(source, {
        rules: {
            'add-argument': ['on', {
                args: {
                    t: ['t', 'test("__a", (__args) => __body)'],
                },
            }],
        },
        plugins: [
            ['add-argument', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', t => {
            t.end();
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-argument: has binding', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', (t) => {
            t.end();
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-argument: wrong place', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        const a = () => {
            t();
        };
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-argument: not a function', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        t();
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

