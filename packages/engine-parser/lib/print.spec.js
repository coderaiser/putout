'use strict';

const mockRequire = require('mock-require');
const {
    test,
    stub,
} = require('supertape');
const montag = require('montag');
const putout = require('putout');
const {
    stopAll,
    reRequire,
} = mockRequire;
const {
    parse,
    print,
} = putout;

test('putout: parser: print: long lines', (t) => {
    const source = montag`
        test.only('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
            const empty = {};
        });
    `;
    const expected = montag`
        import {test} from 'supertape';
        test('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
            const empty = {};
            t.end();
        });
    `;
    const {code} = putout(source, {
        plugins: ['tape'],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: print: bad recast output', (t) => {
    const source = montag`
        export default () => {
          return (
            <h1>hello</h1>
          );
        }
    `;
    const invalid = montag`
        export default () => {
          return (
            <h1>hello</h1>)
          );
        }
    `;
    const expected = montag`
        export default (() => {
          return <h1>hello</h1>;
        });
    `;
    const recastPrint = stub().returns({
        code: invalid,
    });
    
    mockRequire('@putout/recast', {
        print: recastPrint,
    });
    const print = reRequire('./print');
    const ast = parse(source);
    const result = print(ast);
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: empty', (t) => {
    const source = '';
    const ast = parse(source);
    const result = print(ast);
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: balanced braces', (t) => {
    const source = '((a) => fn(42))(value)';
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});
