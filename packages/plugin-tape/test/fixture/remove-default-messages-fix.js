t.ok(true);
t.notOk(false);
t.match('hello', 'hello');
t.notMatch('hello', 'world');
{
    const result = 5;
    const expected = 5;
    
    t.equal(result, expected);
}
{
    const result = 4;
    const expected = 3;
    
    t.notEqual(result, expected);
}
{
    const result = [1, 2];
    const expected = [1, 2];
    
    t.deepEqual(result, expected);
}
{
    const result = [1, 2];
    const expected = [3, 4];
    
    t.notDeepEqual(result, expected);
}
