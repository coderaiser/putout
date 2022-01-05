test('zenload: no config file', async (t) => {
   const readFile = stub().returns(stringify([
        'mock-import',
    ]));
    mockImport('fs/promises', {
        readFile,
    });

    
    const url = 'any.js';
});
