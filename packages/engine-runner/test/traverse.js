'use strict';

const tryCatch = require('try-catch');
const montag = require('montag');

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
    
    const expected = ['x'];
    
    t.deepEqual(result, expected);
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
    
    t.equal(result, expected);
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
    
    const expected = [
        ['x', 'hello'],
    ];
    
    t.deepEqual(result, expected);
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
    
    t.deepEqual(result, expected);
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
    
    t.deepEqual(result, expected);
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
                    node: 'a',
                });
                
                uplist('x', {
                    how: 'come',
                    node: 'b',
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
    
    const expected = [
        [{
            hello: 'world',
            node: 'a',
        }, {
            how: 'come',
            node: 'b',
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: plugins: traverse: store: uplist: clear', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({uplist, push}) => ({
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
                    push(result);
                    result = uplist();
                },
            },
        }),
    };
    
    const [error] = tryCatch(putout, 'debugger', {
        fixCount: 10,
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    t.equal(error.message, `☝️ Looks like 'push' called without a 'path' argument.`);
    t.end();
});

test('putout: runner: plugins: traverse: pathStore', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({pathStore}) => ({
            'debugger'(path) {
                pathStore(path);
                path.remove();
            },
            Program: {
                exit() {
                    result = pathStore();
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
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: uplist: removed node', async (t) => {
    const minify = await import('@putout/plugin-minify');
    const mergeVariables = minify.rules['merge-variables'];
    
    const source = `
        let a;
        let b;
        
        a = 5;
        b = 6;
        
        console.log(a);
    `;
    
    const remove = 'remove-unreferenced-variables';
    const merge = ['merge-variables', mergeVariables];
    
    const plugins = [remove, merge];
    
    const {code} = putout(source, {
        printer: 'putout',
        plugins,
    });
    
    const expected = montag`
        let a;
        
        a = 5;
        
        console.log(a);\n
    `;
    
    t.equal(code, expected);
    t.end();
});
