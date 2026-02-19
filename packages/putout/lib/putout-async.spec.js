import test from 'supertape';
import {
    parse,
    print,
    putoutAsync,
    transformAsync,
    findPlacesAsync,
} from './index.js';

test('putout: async', async (t) => {
    const {code} = await putoutAsync('const a = 5', {
        plugins: ['variables'],
    });
    
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: async: transformAsync', async (t) => {
    const source = 'const a = 5';
    const ast = parse(source);
    
    await transformAsync(ast, {
        plugins: ['variables'],
    });
    
    const result = print(ast);
    const expected = '\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: async: findPlacesAsync', async (t) => {
    const source = 'const a = 5';
    const ast = parse(source);
    
    const places = await findPlacesAsync(ast, {
        plugins: ['variables'],
    });
    
    const expected = [{
        message: `'a' is defined but never used`,
        position: {
            column: 7,
            line: 1,
        },
        rule: 'variables/remove-unused',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
