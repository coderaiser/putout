'use strict';

const test = require('supertape');
const putout = require('putout');

const {runPlugins} = require('..');

test('putout: runner: traverse: exclude', (t) => {
    const rmVar = {
        report: () => '',
        exclude: () => [
            'const __a = __identifier',
        ],
        traverse: ({push}) => ({
            'const __identifier = __b'(path) {
                push(path);
            },
        }),
        fix: (path) => {
            path.remove();
        },
    };
    
    const input = `const x = y`;
    const {code} = putout(input, {
        runPlugins,
        plugins: [
            ['rm-variable', rmVar],
        ],
    });
    
    t.deepEqual(code, input, 'should equal');
    t.end();
});

test('putout: runner: traverse: exclude: not an array', (t) => {
    const rmVar = {
        report: () => '',
        exclude: () => 'const __a = __identifier',
        traverse: ({push}) => ({
            'const __identifier = __b'(path) {
                push(path);
            },
        }),
        fix: (path) => {
            path.remove();
        },
    };
    
    const input = `const x = y`;
    const {code} = putout(input, {
        runPlugins,
        plugins: [
            ['rm-variable', rmVar],
        ],
    });
    
    t.deepEqual(code, input, 'should equal');
    t.end();
});

