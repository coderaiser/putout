'use strict';

const {test} = require('supertape');
const montag = require('montag');
const putout = require('putout');

const {parse, print} = putout;

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
        });\n
    `;
    
    const {code} = putout(source, {
        printer: 'putout',
        plugins: ['tape'],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: print: empty', (t) => {
    const source = '';
    const ast = parse(source);
    const result = print(ast);
    const expected = '\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: balanced braces', (t) => {
    const source = '((a) => fn(42))(value);\n';
    const ast = parse(source);
    
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: parser: print: balanced braces: string', (t) => {
    const source = montag`
        const newText = paramsText
            .replace(a, ')')
            .replace(b, '(');
        
        const a = [
            'hello',
            'world',
        ];
        
        const {b, c} = y;
    
    `;
    
    const ast = parse(source);
    
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: parser: print: printer: babel', (t) => {
    const source = montag`
        export default () => {
          return (
            <h1>hello</h1>
          );
        }
    `;
    
    const expected = montag`
        export default () => {
          return <h1>hello</h1>;
        };
    
    `;
    
    const ast = parse(source);
    
    const result = print(ast, {
        printer: 'babel',
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: printer: putout', (t) => {
    const source = montag`
        export default ({a, b}) => {
          return a + b;
        }
    `;
    
    const expected = montag`
        export default ({a, b}) => {
            return a + b;
        };
    
    `;
    
    const ast = parse(source);
    
    const result = print(ast, {
        printer: 'putout',
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: printer: putout: options', (t) => {
    const source = montag`
        export default ({a, b}) => {
          return a + b;
        }
    `;
    
    const expected = montag`
        export default ({a,__b})__=>__{
            return a__+__b;
        };
    
    `;
    
    const ast = parse(source);
    
    const result = print(ast, {
        printer: ['putout', {
            format: {
                space: '__',
            },
        }],
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: printer: options: indent', (t) => {
    const source = montag`
        export default () => {
          return a + b;
        }
    `;
    
    const expected = montag`
        export default () => {
          return a + b;
        };\n
    `;
    
    const ast = parse(source);
    
    const result = print(ast, {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
    });
    
    t.equal(result, expected);
    t.end();
});
