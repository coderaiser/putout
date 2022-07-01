const expected = montag`
    hello
`;

t.equal(result, expected);

const template =`
    hello
`;

t.equal(result, template);

const string = 'hello';

t.equal(result, string);
