import test from 'supertape';
import transform from '../lib/transform.js';

test('remove-unused-variables: transform: empty', (t) => {
    const result = transform([]);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('remove-unused-variables: transform: 1', (t) => {
    const result = transform([{
        str: {
            count: 1,
        },
    }]);
    
    const expected = [{
        name: 'str',
        count: 1,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('transform: couple', (t) => {
    const result = transform([{
        str: {
            count: 1,
        },
        str2: {
            count: 2,
        },
    }, {
        str2: {
            count: 3,
        },
    }]);
    
    const expected = [{
        name: 'str',
        count: 1,
    }, {
        name: 'str2',
        count: 2,
    }, {
        name: 'str2',
        count: 3,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
