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
    
    const ast = parse(source);
    
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
    
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['remove-unused-variables'],
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
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['remove-unused-variables'],
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
