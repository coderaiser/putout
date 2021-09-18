t.ok(true);
t.notOk(false);
t.match('hello', /hello/);
t.notMatch('hello', /world/);
t.equal(5, 5);
t.notEqual(4, 3);
t.deepEqual([1, 2], [1, 2]);
t.notDeepEqual([1, 2], [3, 4]);
