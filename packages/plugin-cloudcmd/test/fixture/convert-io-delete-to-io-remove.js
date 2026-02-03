await IO.delete('/tmp', {
    files: ['1.txt']
});

await IO.delete('/tmp');