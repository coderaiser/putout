t.ok(true, 'should be truthy');
t.notOk(false, 'should be falsy');
t.match('hello', /hello/, 'should match');
t.notMatch('hello', /world/, 'should not match');
t.equal(5, 5, 'should equal');
t.notEqual(4, 3, 'should not equal');
t.deepEqual([1, 2], [1, 2], 'should deep equal');
t.notDeepEqual([1, 2], [3, 4], 'should not deep equal');
