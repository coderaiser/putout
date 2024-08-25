'use strict';

const test = require('supertape');
const {
    parse,
    print,
    putoutAsync,
    transformAsync,
    findPlacesAsync,
} = require('..');

test('putout: exports: putoutAsync', async (t) => {
    const source = 'for (const a of b.entries()) {}';
    const {code} = await putoutAsync(source, {
        plugins: [
            'apply-entries',
        ],
    });
    
    const expected = 'for (const a of entries(b)) {}\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: exports: transformAsync', async (t) => {
    const source = 'const a = 5';
    const ast = parse(source);
    
    await transformAsync(ast, source, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const result = print(ast);
    const expected = '\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: exports: findPlacesAsync', async (t) => {
    const source = 'const a = 5';
    const ast = parse(source);
    
    const places = await findPlacesAsync(ast, source, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [{
        message: `'a' is defined but never used`,
        position: {
            column: 6,
            line: 1,
        },
        rule: 'remove-unused-variables',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putoutAsync: loader: no plugin found', async (t) => {
    const {places} = await putoutAsync('const a = 5', {
        fix: false,
        rules: {
            'remove-unused-labels': 'off',
        },
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [{
        message: `No plugin found for a rule: 'remove-unused-labels'`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'loader',
    }, {
        message: `'a' is defined but never used`,
        position: {
            column: 6,
            line: 1,
        },
        rule: 'remove-unused-variables',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
