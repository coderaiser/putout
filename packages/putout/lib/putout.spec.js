import test from 'supertape';
import putout from './putout.js';

test('putout: esm', (t) => {
    const {code} = putout('const a = 5', {
        plugins: ['variables'],
    });
    
    t.equal(code, '\n');
    t.end();
});

test('putout: methods', (t) => {
    const ast = putout.parse('const a = 5');
    
    t.ok(ast);
    t.end();
});
