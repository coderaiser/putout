t.notMatch(result, RegExp('hello'));
t.notMatch(result, RegExp('hello'), 'world');
t.notMatch(result, /hello/);
t.notMatch(result, /hello/, 'world');
