import test from 'supertape';
import getUnused from '../lib/get-unused.js';

test('remove-unused-variables: get-unused', (t) => {
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
