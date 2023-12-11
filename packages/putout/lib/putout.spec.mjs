import test from 'supertape';
import putout from './putout.mjs';

test('putout: esm', (t) => {
    const {code} = putout('const a = 5', {
        plugins: ['remove-unused-variables'],
    });
    
    t.equal(code, '\n');
    t.end();
});
