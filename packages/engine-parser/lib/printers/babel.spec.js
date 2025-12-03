'use strict';

const {test} = require('supertape');
const montag = require('montag');

const {
    parse,
    print,
    transform,
} = require('putout');

test('putout: parser: print: printer: babel: preserve format', (t) => {
    const source = montag`
        export default () => {
            const a = 3;
            
            return a + b;
        }
    `;
    
    const expected = montag`
        export default () => {
            const a = 3;
            
            return a + b;
        }\n
    `;
    
    const ast = parse(source, {
        printer: 'babel',
    });
    
    const result = print(ast, {
        printer: 'babel',
        source,
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: printer: babel: preserve format: trim', (t) => {
    const source = montag`
        const c = 2;
        export default () => {
            const a = 3;
            
            return a + b;
        }
    `;
    
    const expected = montag`
        export default () => {
            const a = 3;
            
            return a + b;
        }\n
    `;
    
    const ast = parse(source, {
        printer: 'babel',
    });
    
    transform(ast, source, {
        plugins: ['variables'],
    });
    
    const result = print(ast, {
        printer: 'babel',
        source,
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: printer: babel: preserve format: align-spaces: off', (t) => {
    const source = montag`
        const c = 2;
        export default () => {
            const a = 3;
            
            return a + b;
        }
    `;
    
    const ast = parse(source, {
        printer: 'babel',
    });
    
    transform(ast, source, {
        plugins: ['variables'],
    });
    
    const result = print(ast, {
        printer: ['babel', {
            alignSpaces: false,
        }],
        source,
    });
    
    const expectedRaw = montag`
        export default () => {
            const a = 3;
            
            return a + b;
        }\n
    `.split('\n');
    
    expectedRaw[2] = '';
    
    const expected = expectedRaw.join('\n');
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: printer: babel: preserve format: parens: parser: not set printer', (t) => {
    const source = montag`
        const a: (boolean | number)[] = [false, 1];
    `;
    
    const ast = parse(source, {
        printer: 'babel',
        isTS: true,
    });
    
    const result = print(ast, {
        printer: 'babel',
        source,
    });
    
    const expected = montag`
        const a: (boolean | number)[] = [false, 1];\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: print: printer: babel: preserve format: parens', (t) => {
    const source = montag`
        a && (a = b);
        const a: (boolean | number)[] = [false, 1];
    `;
    
    const ast = parse(source, {
        isTS: true,
        printer: 'babel',
    });
    
    const result = print(ast, {
        printer: 'babel',
        source,
    });
    
    const expected = montag`
        a && (a = b);
        const a: (boolean | number)[] = [false, 1];\n
    `;
    
    t.equal(result, expected);
    t.end();
});
