{
    import minimist from 'minimist';

    const args = minimist(argv.slice(2), {
        string: ['repo', 'user'],
    });
}
