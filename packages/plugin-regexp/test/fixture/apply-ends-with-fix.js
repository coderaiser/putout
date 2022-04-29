a.endsWith('hello');
a.endsWith('hello:');
a.endsWith('hello,');
a.endsWith('hello-');
a.endsWith('hello,');

a === 'hello';
/[a-z]$/.test(a);
a.endsWith('a');
/a.+$/.test(a);
/a.*$/.test(a);
/a.b$/.test(a);

/hello/.test(a);
x.test(a);
