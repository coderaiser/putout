const {loadDir} = CloudCmd;

await loadDir({
    path
});

await loadDir({
    path: '/',
});

await loadDir({
    path,
    panel,
});
