import mockRequire from 'mock-require';

mockRequire('node:fs/promises', {
    readdir,
});

mockRequire(``, {
    readdir,
});
