a.startsWith('hello');
a.startsWith('hello:');
a.startsWith('hello,');
a.startsWith('hello-');
a.startsWith('hello,');

a === 'hello';
/^[a-z]/.test(a);
a.startsWith('a');
/^a.+/.test(a);
/^a.*/.test(a);
/^a.b/.test(a);

/hello/.test(a);
x.test(a);
