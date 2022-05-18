a === Object.assign(a);
a === assign(a);

a === Object.assign(a, {});
a === assign(a, {});

const load = stub().rejects(assign(Error('LOAD USED')));
