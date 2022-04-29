a.startsWith('hello');
a.startsWith('hello:');
a.startsWith('hello,');
a.startsWith('hello-');
a.startsWith('hello,');

/^hello$/.test(a);
/^[a-z]/.test(a);
/^(a)/.test(a);
/^a.+/.test(a);
/^a.*/.test(a);
/^a.b/.test(a);

/hello/.test(a);
x.test(a);
