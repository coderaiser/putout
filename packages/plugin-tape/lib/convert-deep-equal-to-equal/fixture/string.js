const expected = montag`
    hello
`;

t.deepEqual(result, expected);

const template =`
    hello
`;

t.deepEqual(result, template);

const string = 'hello';

t.deepEqual(result, string);
