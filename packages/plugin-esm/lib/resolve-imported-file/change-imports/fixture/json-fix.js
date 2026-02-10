import a from './a.json' with {
    type: 'json',
};

await import('./a.json', {
    with: {
        type: 'json',
    },
});
