import test from 'supertape';
import getUnused from './get-unused.js';

test('putout: plugin-variables: remove-unused: get-unused', (t) => {
    const result = getUnused([{
        name: 'a',
        declared: true,
        used: false,
    }, {
        name: 'b',
        declared: true,
        used: true,
    }]);
    
    const expected = [{
        name: 'a',
        declared: true,
        used: false,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
