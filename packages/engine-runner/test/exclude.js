import test from 'supertape';
import putout from 'putout';
import {runPlugins} from '../lib/index.js';

test('putout: runner: traverse: exclude', (t) => {
    const rmVar = {
        report: () => '',
        exclude: () => ['const __a = __identifier'],
        traverse: ({push}) => ({
            'const __identifier = __b'(path) {
                push(path);
            },
        }),
        fix: (path) => {
            path.remove();
        },
    };
    
    const input = `const x = y;\n`;
    const {code} = putout(input, {
        runPlugins,
        plugins: [
            ['rm-variable', rmVar],
        ],
    });
    
    t.equal(code, input);
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
    
    const input = `const x = y;\n`;
    
    const {code} = putout(input, {
        runPlugins,
        plugins: [
            ['rm-variable', rmVar],
        ],
    });
    
    t.equal(code, input);
    t.end();
});
