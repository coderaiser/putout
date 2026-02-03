await IO.remove('/tmp', {
    files: ['1.txt'],
});

await IO.remove('/tmp');
