'use strict';

const test = require('supertape');
const putout = require('putout');
const {runPlugins} = require('..');

test('putout: runner: plugins: traverse: listStore', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({listStore}) => ({
            'debugger'() {
                listStore('x');
            },
            Program: {
                exit() {
                    result = listStore();
                },
            },
        }),
    };
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [
        'x',
    ];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: traverse: store: value', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({store}) => ({
            'debugger'() {
                store('x', 'hello');
            },
            Program: {
                exit() {
                    result = store('x');
                },
            },
        }),
    };
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = 'hello';
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: traverse: store: entries', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({store}) => ({
            'debugger'() {
                store('x', 'hello');
            },
            Program: {
                exit() {
                    result = store.entries();
                },
            },
        }),
    };
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [['x', 'hello']];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: traverse: store: values', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({store}) => ({
            'debugger'() {
                store('x', 'hello');
            },
            Program: {
                exit() {
                    result = store();
                },
            },
        }),
    };
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = ['hello'];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: traverse: store: object', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({upstore}) => ({
            'debugger'() {
                upstore('x', {
                    hello: 'world',
                });
                
                upstore('x', {
                    how: 'come',
                });
            },
            Program: {
                exit() {
                    result = upstore();
                },
            },
        }),
    };
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        hello: 'world',
        how: 'come',
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: traverse: store: uplist', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({uplist}) => ({
            'debugger'() {
                uplist('x', {
                    hello: 'world',
                });
                
                uplist('x', {
                    how: 'come',
                });
            },
            Program: {
                exit() {
                    result = uplist();
                },
            },
        }),
    };
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [[{
        hello: 'world',
    }, {
        how: 'come',
    }]];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});
