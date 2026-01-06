import test from 'supertape';
import montag from 'montag';
import {
    parse,
    print,
    traverse,
} from 'putout';
import {rename} from './index.js';

test('putout: operate: rename: assignment pattern', (t) => {
    const ast = parse('const {hello: x} = c; hello();');
    
    traverse(ast, {
        VariableDeclaration(path) {
            rename(path, 'hello', 'world');
        },
    });
    
    const result = print(ast, {
        printer: 'putout',
    });
    
    const expected = montag`
        const {hello: x} = c;
        hello();\n
    `;
    
    t.equal(result, expected);
    t.end();
});
