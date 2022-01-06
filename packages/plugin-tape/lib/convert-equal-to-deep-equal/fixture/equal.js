t.equal(result, {});
t.equal(result, []);

const expected = {};

t.equal(result, expected);

const expected2 = {};
const expected3 = [];

t.equal(result, expected2);
t.equal(result, expected3);
t.equal(result, expected4);
t.equal(result, a.b);

t.notEqual(result, {});
t.notEqual(result, []);

test('', () => {
    const expected = [];
    t.equal(result, expected);
});
